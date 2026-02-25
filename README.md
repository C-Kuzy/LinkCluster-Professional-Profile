<div align="center">

# 🌊 LinkCluster Professional Profile

### Your Personal Link Hub - **No Ads. No Subscriptions. Just Links.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)
[![License](https://img.shields.io/badge/License-EULA-blue.svg)](./EULA.LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](./package.json)

*Tired of LinkTree ads? Want full control over your professional presence?*  
**LinkCluster** is your ad-free, customizable alternative with stunning animations.

[✨ View Demo](#) | [🚀 Quick Start](#-quick-start) | [📖 Documentation](#-customization-guide)

</div>

---

## 🎯 Why LinkCluster?

<table>
<tr>
<td width="50%">

### ❌ LinkTree Problems
- 😤 Intrusive ads on free tier
- 💰 Expensive subscriptions ($5-24/mo)
- 🎨 Limited customization
- 📊 Analytics locked behind paywall
- 🔒 Vendor lock-in

</td>
<td width="50%">

### ✅ LinkCluster Benefits
- 🎉 **100% Ad-Free** forever
- 💸 **$0/month** (just hosting)
- 🎨 **Fully Customizable** (you own it!)
- 🌊 **Stunning Three.js** animations
- 🚀 **Deploy anywhere** in minutes

</td>
</tr>
</table>

---

## 🎬 Preview

<div align="center">

### 🌟 Features Showcase

```
┌─────────────────────────────────────┐
│   🌊 Animated Wind Background 🌊    │
│                                     │
│         👤 Your Photo                │
│        Your Name & Title             │
│                                     │
│   ┌─────────────────────────┐      │
│   │  🔗 Professional Link   │      │
│   └─────────────────────────┘      │
│   ┌─────────────────────────┐      │
│   │  💼 LinkedIn Profile    │      │
│   └─────────────────────────┘      │
│   ┌─────────────────────────┐      │
│   │  💻 GitHub Projects     │      │
│   └─────────────────────────┘      │
│   ┌─────────────────────────┐      │
│   │  📧 Contact Email       │      │
│   └─────────────────────────┘      │
│                                     │
└─────────────────────────────────────┘
```

**✨ Smooth hover effects • 📱 Mobile responsive • 🎨 Animated background**

</div>

---

## 📂 Project Structure

```
LinkCluster-Professional-Profile/
│
├── 📄 KzyINdex.html              # Main HTML file
├── 🎨 main.css                   # Styling & responsive design
├── ⚙️  main.js                   # Link rendering logic
│
├── 🌊 ABreeze.js                 # Three.js wind animation
├── ⚙️  breeze-config.js          # Animation configuration
│
├── 🔗 Prof-Media-Link(s).js      # YOUR LINKS GO HERE! ⭐
│
├── 📦 package.json               # Project metadata
├── 🚀 vercel.json                # Vercel deployment config
│
├── 📁 api/
│   └── chat.js                   # Optional chat API
│
├── 📁 info/
│   ├── .gitattributes
│   └── .gitignore
│
├── 📜 EULA.LICENSE               # License information
└── 📖 README.md                  # You are here!
```

---

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended - 2 minutes)

1. **Fork this repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Click "Deploy"
   - **Done!** 🎉

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/C-Kuzy/LinkCluster-Professional-Profile.git
cd LinkCluster-Professional-Profile

# Open with a local server (choose one):

# Python 3
python3 -m http.server 8000

# Node.js (if you have npx)
npx serve

# PHP
php -S localhost:8000

# Then visit: http://localhost:8000/KzyINdex.html
```

### Option 3: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

---

## 🎨 Customization Guide

### 1️⃣ **Update Your Links** (Most Important!)

Edit **`Prof-Media-Link(s).js`**:

```javascript
export const links = [
    {
        name: "Your Portfolio Website",
        link: "https://yourwebsite.com",
        image: "https://cdn.iconfinder.com/icon-url.png",
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/your-profile",
        image: "https://cdn.iconfinder.com/linkedin-icon.png",
    },
    {
        name: "GitHub",
        link: "https://github.com/your-username",
        image: "https://cdn.iconfinder.com/github-icon.png",
    },
    // Add more links here!
];
```

**🎯 Find Icons:** [Iconfinder](https://www.iconfinder.com/search/icons?category=social-media)

---

### 2️⃣ **Personalize Your Profile**

Edit **`KzyINdex.html`**:

```html
<!-- Change your profile photo -->
<img class="logo"
     src="YOUR_PHOTO_URL"
     alt="Your Photo"/>

<!-- Update your name and title -->
<h1>Your Name ツ</h1>

<div class="about">
    <div>Your Current Role</div>
    <div>Your School/Company</div>
</div>
```

---

### 3️⃣ **Customize Colors & Styling**

Edit **`main.css`**:

```css
body {
    background-color: #000000;  /* Background color */
}

.Links a {
    background-color: #1a1a1a;  /* Link button color */
    color: #ffffff;             /* Text color */
}

.Links a:hover {
    background-color: #2a2a2a;  /* Hover color */
    transform: scale(1.05);     /* Hover effect */
}
```

---

### 4️⃣ **Adjust Wind Animation**

Edit **`breeze-config.js`**:

```javascript
export const config = {
    particleCount: 500,          // More = denser wind
    windSpeed: 0.5,              // Speed of animation
    particleColor: 0x88ccff,     // Particle color (hex)
    particleSize: 2.0,           // Particle size
};
```

---

## 🎓 Advanced Customization

### Add Google Analytics

In **`KzyINdex.html`**, add to `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Add Custom Font

In **`main.css`**:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

body {
    font-family: 'YourFont', sans-serif;
}
```

### Add Dark/Light Mode Toggle

Create a button in **`KzyINdex.html`** and add JavaScript to toggle classes!

---

## 🌐 Hosting Options

| Platform | Cost | Setup Time | Custom Domain |
|----------|------|------------|---------------|
| **Vercel** | Free | 2 min | ✅ Free |
| **Netlify** | Free | 3 min | ✅ Free |
| **GitHub Pages** | Free | 5 min | ✅ With upgrade |
| **Cloudflare Pages** | Free | 3 min | ✅ Free |

**💡 Tip:** All platforms offer free HTTPS and automatic deployments from GitHub!

---

## 💡 Usage Tips

### SEO Optimization
- Update `<title>` and `<meta>` tags in `KzyINdex.html`
- Add Open Graph tags for better social sharing

### Performance
- Optimize images before uploading
- Use CDN links for icons (already included!)
- The Three.js bundle is ~600KB (loads fast!)

### Mobile Optimization
- Already responsive by default! 📱
- Test on multiple devices
- Adjust font sizes in media queries if needed

---

## 🤝 Contributing

Want to improve LinkCluster?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the EULA License - see the [EULA.LICENSE](./EULA.LICENSE) file for details.

---

## 🆘 Need Help?

<details>
<summary><b>🐛 Links not showing up?</b></summary>

Check that:
- You're running a local server (not opening `file://`)
- `Prof-Media-Link(s).js` is properly formatted
- Browser console for errors (F12)
</details>

<details>
<summary><b>🎨 Animation not working?</b></summary>

Ensure:
- Three.js CDN is loading (check network tab)
- `ABreeze.js` and `breeze-config.js` are in the root folder
- No JavaScript errors in console
</details>

<details>
<summary><b>📱 Not responsive on mobile?</b></summary>

- Clear browser cache
- Check viewport meta tag is present
- Test in mobile device mode (F12 → Toggle device toolbar)
</details>

---

## 🌟 Show Your Support

If LinkCluster helped you ditch LinkTree ads, give it a ⭐!

**Share it with others who hate ads too!** 🚀

---

<div align="center">

### 🎯 Break Free from LinkTree Subscriptions

**Built with ❤️ by [C-Kuzy](https://github.com/C-Kuzy)**

*C-Kuzy Solutions © 2026*

---

**[⬆ Back to Top](#-linkcluster-professional-profile)**

</div>