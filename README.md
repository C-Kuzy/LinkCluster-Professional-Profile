<div align="center">

# LinkCluster Professional Profile

A customizable, animated link aggregator for your professional online presence. Self-hosted alternative to traditional link management platforms — no ads, no subscriptions, just your links.

[![License](https://img.shields.io/badge/License-EULA-blue.svg)](./EULA.LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)
[![Version](https://img.shields.io/badge/version-2.1.5-green.svg)](./package.json)

</div>

---

**📸 Preview for GitHub Viewers:**

<div align="center">
  <img src="https://github.com/user-attachments/assets/c6cae110-cd67-4116-81a5-69d969b84f43" alt="Custom LinkCluster - Newer Linktree" width="800">
  <p><i>Custom LinkCluster User Viewpoint</i></p>
</div>



## Why This Exists

Tired of paying monthly subscriptions just to share your links? Want something you actually own and control? LinkCluster gives you a beautiful, animated link hub that's completely yours — host it anywhere, customize everything, zero ongoing costs.

## Features

- **Ad-free forever** — Because nobody likes ads on their professional profile
- **Animated wind effects** — Smooth Three.js particle background
- **Fully customizable** — Change colors, fonts, layout, everything
- **Mobile responsive** — Looks great on any device
- **Self-hosted** — Deploy to Vercel, Netlify, or anywhere you want
- **Zero vendor lock-in** — It's your code, do whatever you want with it

## Quick Start

### Deploy to Vercel (Easiest)

1. Fork this repository
2. Head to [vercel.com](https://vercel.com) and create a new project
3. Import your forked repository
4. Click deploy and you're done

### Local Development

```bash
git clone https://github.com/yourusername/LinkCluster-Professional-Profile.git
cd LinkCluster-Professional-Profile

# Start a local server (choose one):
python3 -m http.server 8000
# or
npx serve
# or
php -S localhost:8000

# Visit: http://localhost:8000/KzyINdex.html
```

## Project Structure

```
LinkCluster-Professional-Profile/
├── KzyINdex.html              # Main HTML file
├── lib/
│   ├── assets/
│   │   └── app.css            # Styles and responsive design
│   ├── core/
│   │   └── renderer.js        # Link rendering
│   ├── data/
│   │   └── links.js           # Link configuration
│   └── effects/
│       ├── config.js          # Animation settings
│       ├── visual.js          # Background animation
│       └── typewriter.js      # Text effects
├── package.json
├── vercel.json
└── README.md
```

## Customization

Here's how to make it yours:

### Update Your Links

Edit `lib/data/links.js` and add your own links:

```javascript
export const links = [
    {
        name: "Portfolio",
        link: "https://yourwebsite.com",
        image: "https://cdn.example.com/icon.png",
    },
    {
        name: "LinkedIn",
        link: "https://linkedin.com/in/yourprofile",
        image: "https://cdn.example.com/linkedin-icon.png",
    },
    // Add as many as you need
];
```

### Personalize Your Info

Open `KzyINdex.html` and update:
- Your profile photo URL
- Your name and title
- Your description

### Style It Your Way

Edit `lib/assets/app.css` to customize:
- Colors and gradients
- Fonts and typography
- Button styles
- Hover effects
- Everything visual

### Tweak the Animation

Open `lib/effects/config.js` to adjust:

```javascript
export const breezeConfig = {
    streakCount: 3000,      // More = denser animation
    minVelocityX: 0.2,      // Speed of particles
    colors: [               // Your color palette
        0xff2d55,           // Hot pink
        0x8e44ad,           // Purple
        0x2980b9,           // Blue
        // Add your own hex colors
    ],
};
```

### Customize the Typewriter Effect

In `lib/effects/typewriter.js`, change the text and timing:

```javascript
const typewriterConfig = {
    name: "Your Name",
    description: "Your Title<br>Your Organization",
    nameSpeed: 80,          // Faster = lower number
    descriptionSpeed: 40,
};
All these platforms offer free hosting with SSL:

| Platform | Cost | Custom Domain | Deploy Time |
|----------|------|---------------|-------------|
| Vercel | Free | ✓ | ~2 min |
| Netlify | Free | ✓ | ~3 min |
| GitHub Pages | Free | ✓ | ~5 min |
| Cloudflare Pages | Free | ✓ | ~3 min |

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

Just push to a `gh-pages` branch or configure it in your repo settings.

## Pro Tips

**SEO:** Update the meta tags in `KzyINdex.html` for better search visibility and social sharing.

**Performance:** The background animation automatically scales down on mobile to keep things smooth. No configuration needed.

**Icons:** Use high-quality icon CDNs like Iconfinder or Flaticon for your link buttons.

## Troubleshooting

**Links not showing?**
- Make sure you're running a local server (not just opening the HTML file)
- Check the browser console for errors
- Verify your `links.js` syntax

**Animation looking weird?**
- Confirm Three.js is loading from the CDN
- Check if your browser supports WebGL
- Try adjusting the particle count in config

**Mobile issues?**
- Clear your cache
- Test in device mode in browser dev tools
- The viewport meta tag should be present in the HTML

## License

Licensed under EULA. See [EULA.LICENSE](./EULA.LICENSE) for details.

---

<div align="center">

**Built by [C-Kuzy](https://github.com/C-Kuzy)**

Got questions or want to contribute? Open an issue on GitHub.

---

*For feature requests or bug reports, please open an issue on GitHub.*

</div>
