/**
 * Example: How to securely call OpenAI through your serverless backend
 * @author C-Kuzy
 */

async function callSecureOpenAI(userMessage) {
  try {
    // Call YOUR serverless function instead of OpenAI directly
    // API key stays on server - never exposed to browser
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        model: 'gpt-4', // or 'gpt-3.5-turbo' for cheaper calls
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      console.log('AI Response:', data.message);
      return data.message;
    } else {
      throw new Error(data.error || 'Unknown error');
    }

  } catch (error) {
    console.error('Failed to call AI:', error);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const aiResponse = await callSecureOpenAI('Hello, how are you?');
    document.getElementById('response').textContent = aiResponse;
  } catch (error) {
    document.getElementById('response').textContent = 'Error: ' + error.message;
  }
}

// Export for use in other modules
export { callSecureOpenAI };
