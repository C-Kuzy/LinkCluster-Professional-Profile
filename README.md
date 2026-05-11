<div align="center">

# **LINKCLUSTER PROFESSIONAL PROFILE**

A customizable, animated link aggregator for your professional online presence. Self-hosted alternative to traditional link management platforms — no ads, no subscriptions, just your links.

[![License](https://img.shields.io/badge/License-EULA-blue.svg)](./EULA-LICENSE)
[![Version](https://img.shields.io/badge/version-2.1.0-green.svg)](./package.json)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![GitHub](https://img.shields.io/badge/Hosting-Github-red.svg)](https://github.com)

[![Deploy](https://vercel.com/button)](https://vercel.com)
</div>

---

## **PREVIEW**

<div align="center">
  <img src="https://github.com/user-attachments/assets/d0b8c6c8-052d-493e-b260-9ab635cf6be3" alt="LinkCluster Professional Profile" width="800">
  <p><i>Professional link hub with animated particle background</i></p>
</div>

---

## **FEATURES**

- **AD-FREE FOREVER** — No ads, no tracking, no subscriptions
- **Animated Effects** — Smooth Three.js particle background with breeze effects
- **Typewriter Animation** — Dynamic name and description typing effect
- **EULA Modal** — Professional "jet-away" animation revealing your terms
- **Fully Customizable** — Colors, fonts, layout, animations — everything
- **Mobile Responsive** — Optimized for all devices with adaptive performance
- **Security Hardened** — CSP headers, XSS protection, content security
- **Self-Hosted** — Deploy to Vercel, Netlify, or any static host
- **Zero Dependencies** — Just Three.js for animations, pure vanilla JS
- **Accessible** — Semantic HTML and proper ARIA attributes

---

## **QUICK START**

### Option #1: Deploy to Vercel (Recommended)

1. **Fork this repository**
2. Visit [vercel.com](https://vercel.com) and create a new project
3. Import your forked repository
4. Click deploy — done! 🎉

Your LinkCluster will be live at `https://your-project.vercel.app`

### Option #2: Local Development

```bash
# Clone the repository
git clone https://github.com/C-Kuzy/LinkCluster-Professional-Profile.git
cd LinkCluster-Professional-Profile

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## **PROJECT STRUCTURE**

```
LinkCluster-Professional-Profile/
├── KzyINdex.html              # Main HTML entry point
├── lib/
│   ├── assets/                # Images and icons
│   │   └── LinkCluster.png
│   ├── core/
│   │   └── renderer.js        # Link rendering engine
│   ├── data/
│   │   ├── links.js           # Your link configuration
│   │   └── EULA.html          # EULA content template
│   ├── design/
│   │   └── app.css            # Main stylesheet
│   └── effects/
│       ├── eula.js            # EULA modal & jet-away animation
│       ├── typewriter.js      # Typewriter text effect
│       └── visual.js          # Three.js particle background
├── package.json               # Dependencies & scripts
├── vite.config.js             # Build configuration
├── vercel.json                # Deployment config with security headers
├── EULA-LICENSE               # License agreement
└── README.md                  # You are here
```

---

## **CUSTOMIZATION GUIDE**

### 1. Update Your Links

Edit `lib/data/links.js`:

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
        image: "https://cdn.iconfinder.com/data/icons/logos/64/linkedin-icon.png",
    },
    {
        name: "GitHub",
        link: "https://github.com/yourusername",
        image: "https://cdn.iconfinder.com/data/icons/logos/64/github-icon.png",
    },
];

export const metadata = {
    name: "Your Name",
    description: "Your Title<br>Your Organization",
};
```

### 2. Customize Styling

Edit `lib/design/app.css` to change:

- **Colors**: Update CSS custom properties for link backgrounds
- **Fonts**: Change `font-family` declarations (currently uses Roboto & Montserrat)
- **Link Styles**: Modify `.link` classes for button appearance
- **Hover Effects**: Adjust `.link:hover` for interactive states
- **Footer**: Customize `.enhanced-footer` styling

### 3. Adjust Animations

**Background Particles** (`lib/effects/visual.js`):
```javascript
// Modify particle settings
particleCount: 3000,
particleSize: 0.1,
velocity: { x: 0.5, y: 0.2 },
colors: [0xff2d55, 0x8e44ad, 0x2980b9]
```

**Typewriter Effect** (`lib/effects/typewriter.js`):
```javascript
// Speed and timing
nameSpeed: 80,           // Lower = faster typing
descriptionSpeed: 40,
pauseBetween: 500        // Pause between name and description
```

**EULA Animation** (`lib/effects/eula.js`):
- Jet-away effect automatically calculates element trajectories
- Modal transition timing: 800ms cubic-bezier
- Customize colors by changing CSS `.eula-modal` styles

### 4. Update EULA Content

Edit `lib/data/EULA.html` to customize your license agreement:
- Copyright information
- Terms and conditions
- Attribution requirements
- Usage restrictions

### 5. Change Profile Photo

In `KzyINdex.html`, update the logo image source:
```html
<img class="logo" 
     src="https://your-image-url.com/photo.png"
     alt="Your Name"/>
```

---

## **FORWARD DEPLOYMENT OPTIONS**

All these platforms offer free hosting with automatic SSL:

| Platform | Cost | Custom Domain | Build Time | Features |
|----------|------|---------------|------------|----------|
| **Vercel** | Free | ✓ | ~2 min | Edge network, auto-preview |
| **Netlify** | Free | ✓ | ~3 min | Forms, functions available |
| **GitHub Pages** | Free | ✓ | ~5 min | GitHub integration |
| **Cloudflare Pages** | Free | ✓ | ~3 min | CF network, analytics |

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

### Netlify Deployment

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Build the project: `npm run build`
2. Push `dist/` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

---

## **IMPLEMENTED SECURITY FEATURES**

This project implements multiple security layers:

### HTTP Security Headers (via `vercel.json`)
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **X-Frame-Options**: Blocks clickjacking attacks
- **X-XSS-Protection**: Browser XSS filter enabled
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts camera, microphone, geolocation

### Build Security (via `vite.config.js`)
- **No source maps** in production
- **Console removal** in production builds
- **ASCII-only output** for better compatibility
- **Safari 10 compatibility** fixes
- **Aggressive minification** with Terser

### Content Security
- External resources loaded from trusted CDNs only
- No inline scripts in production builds
- Asset integrity via content hashing

---

## **PERSONAL RECOMMENDATIONS**

**SEO Optimization:**
- Update `<title>` and meta tags in `KzyINdex.html`
- Add Open Graph tags for better social sharing
- Include schema.org markup for rich results

**Performance:**
- Background animation auto-scales on mobile devices
- Images are lazy-loaded where possible
- Three.js chunks are split for faster loading

**Icon Resources:**
- [Iconfinder](https://www.iconfinder.com/) - High-quality free icons
- [Flaticon](https://www.flaticon.com/) - Extensive icon library
- Use CDN URLs for faster loading

**Custom Domain:**
- All hosting platforms support custom domains
- Configure DNS with CNAME record
- SSL certificates are automatic and free

---

## **HAVING ISSUES? TROUBLESHOOT!**

### Links not showing?
1. Ensure you're running a local server (not opening HTML file directly)
2. Check browser console for errors (F12)
3. Verify `links.js` exports are correct
4. Confirm module paths in HTML are accurate

### Animation issues?
1. Verify Three.js is loading from CDN
2. Check browser WebGL support
3. Try reducing particle count in `visual.js`
4. Clear browser cache and reload

### Build errors?
1. Update Node.js to v18+ and npm to v9+
2. Delete `node_modules` and run `npm install` again
3. Check for conflicting global packages
4. Verify all file paths use forward slashes

### EULA not displaying?
1. Check that `lib/data/EULA.html` exists
2. Verify fetch path in `eula.js` matches file location
3. Check browser console for CORS errors
4. Ensure modal div has class `eula-content`

---

## **LICENSING**

This project is licensed under EULA (End User License Agreement).  
See [EULA-LICENSE](./EULA-LICENSE) for full terms.

**Key Points:**
- ✅ Free to use, modify, and distribute
- ✅ Attribution required in source files
- ✅ Open-source compatible
- ⚠️ Contact required for substantial use (>75%)

---

<div align="center">

[Report Bug](https://github.com/C-Kuzy/LinkCluster-Professional-Profile/issues) · [Request Feature](https://github.com/C-Kuzy/LinkCluster-Professional-Profile/issues) · [Discussions](https://github.com/C-Kuzy/LinkCluster-Professional-Profile/discussions)

---
© 2026 C-Kuzy Solutions. All rights reserved.
</div>