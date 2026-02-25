/**
 * Secure serverless function for OpenAI API calls
 * Deployed on Vercel - keeps API key server-side
 * @author C-Kuzy
 */

export default async function handler(req, res) {
  // Enable CORS for your domain only
  res.setHeader('Access-Control-Allow-Origin', 'https://linkcluster.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from Vercel environment variable (never exposed to client)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Extract user message from request
    const { message, model = 'gpt-4', max_tokens = 500 } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Rate limiting check (basic)
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // TODO: Implement proper rate limiting with Redis/Upstash

    // Call OpenAI API from server-side
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }],
        max_tokens: max_tokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ 
        error: 'OpenAI API request failed',
        details: error 
      });
    }

    const data = await response.json();
    
    // Return only necessary data to client
    return res.status(200).json({
      success: true,
      message: data.choices[0].message.content,
      usage: data.usage // Optional: for monitoring
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
