# 🔒 API KEY SECURITY BREACH - RECOVERY GUIDE

## ⚠️ WHAT HAPPENED
Someone accessed your OpenAI API key from your public GitHub repository or website and viewed your ChatGPT conversation history.

## 🚨 IMMEDIATE ACTIONS (Do these NOW)

### 1. Revoke Compromised API Key
```
1. Go to: https://platform.openai.com/api-keys
2. Find the compromised key
3. Click "Revoke" and confirm
4. Delete the key completely
```

### 2. Generate New API Key
```
1. Click "Create new secret key"
2. Name it clearly (e.g., "LinkCluster-Secure-2026")
3. Copy it immediately - you won't see it again
4. Store it ONLY in Vercel environment variables (instructions below)
```

### 3. Check Your OpenAI Usage
```
1. Visit: https://platform.openai.com/usage
2. Look for suspicious activity
3. Check if unauthorized charges occurred
4. Contact OpenAI support if needed: help.openai.com
```

---

## 🛡️ SECURE BACKEND IMPLEMENTATION

### Architecture
```
Browser → Your Vercel Function → OpenAI API
           (API Key Hidden)
```

### Files Created:
- `api/chat.js` - Serverless function (handles OpenAI calls server-side)
- `.env` - Your NEW API key (NEVER commit this)
- `.env.example` - Template for other developers
- `.gitignore` - Prevents accidental key exposure
- `api-client-example.js` - How to call your secure API

### Setup Steps:

#### A. Add Your New API Key Locally
```bash
cd /home/user/LinkCluster-Professional-Profile
nano .env
# Replace 'your-new-key-here' with your actual NEW key
# Save and exit (Ctrl+X, Y, Enter)
```

#### B. Configure Vercel Environment Variables
```
1. Go to: https://vercel.com/dashboard
2. Select your LinkCluster project
3. Settings → Environment Variables
4. Add new variable:
   Name: OPENAI_API_KEY
   Value: [paste your NEW key]
   Environments: ✓ Production ✓ Preview ✓ Development
5. Click "Save"
```

#### C. Test Your Secure API
```bash
# Local testing (after adding .env)
npm install vercel -g
vercel dev

# Then in another terminal or browser:
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, test message"}'
```

---

## 🔍 REMOVE KEYS FROM GIT HISTORY

Your API key might still exist in old commits. Remove it:

### Option 1: BFG Repo-Cleaner (Recommended)
```bash
cd /home/user/LinkCluster-Professional-Profile

# Install BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Search for your old key first (replace sk-... with your OLD key prefix)
git log --all --full-history -S"sk-proj" --oneline

# Remove the key from ALL commits
java -jar bfg-1.14.0.jar --replace-text <(echo "sk-proj*****YOUR_OLD_KEY*****==>REDACTED") .git

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: This rewrites history)
git push --force --all
```

### Option 2: git filter-repo (Alternative)
```bash
# Install git-filter-repo
pip3 install git-filter-repo

# Remove sensitive files
git filter-repo --path-match .env --invert-paths
git filter-repo --replace-text <(echo "sk-proj*****==>REDACTED")

# Force push
git push --force --all
```

### ⚠️ After Cleaning Git History
```
IMPORTANT: Anyone who cloned your repo needs to re-clone it.
Old clones still contain the exposed key.
```

---

## 🔐 SECURITY BEST PRACTICES

### 1. Never Store Keys in Code
```javascript
// ❌ NEVER DO THIS
const apiKey = "sk-proj-abc123...";

// ✅ DO THIS (server-side only)
const apiKey = process.env.OPENAI_API_KEY;
```

### 2. Use Environment Variables
```
Development: .env file (gitignored)
Production: Vercel Environment Variables
```

### 3. Enable GitHub Secret Scanning
```
1. Go to your repo: Settings → Security → Secret scanning
2. Enable alerts
3. GitHub will notify you of exposed secrets
```

### 4. Add Pre-commit Hooks
```bash
# Install git-secrets
brew install git-secrets  # macOS
# or
apt-get install git-secrets  # Linux

# Set up in your repo
cd /home/user/LinkCluster-Professional-Profile
git secrets --install
git secrets --register-aws
git secrets --add 'sk-proj-[a-zA-Z0-9]{40,}'
```

### 5. Rotate Keys Regularly
```
- Change API keys every 3-6 months
- Immediately after any suspected compromise
- Use different keys for different projects
```

---

## 📊 MONITOR FOR FUTURE BREACHES

### Set Up Alerts
1. **OpenAI Usage Alerts**: Set spending limits at platform.openai.com/usage
2. **GitHub Secret Scanning**: Automatic alerts for exposed tokens
3. **Vercel Logs**: Monitor function calls at vercel.com/dashboard

### Check These Regularly
- OpenAI usage dashboard
- Vercel function logs
- GitHub security alerts
- Your credit card statements

---

## 🔒 AFFECTED PROJECTS CHECK

You have these public repos. Check ALL of them:

```bash
# Check C-Kuzy repo
cd /home/user/C-Kuzy
git log --all -S"sk-proj" --oneline

# Check MetLife-Banner repo  
cd /home/user/MetLife-Banner
git log --all -S"sk-proj" --oneline

# If you find keys in either, repeat the removal process
```

---

## 📞 NEED HELP?

If charges are fraudulent:
- OpenAI Support: help.openai.com
- File unauthorized charge dispute with your bank

If you need clarification on any step, ask me and I'll walk you through it.

---

## ✅ FINAL CHECKLIST

- [ ] Revoked old compromised API key
- [ ] Generated new API key
- [ ] Added new key to Vercel environment variables  
- [ ] Never committed .env file (verified .gitignore)
- [ ] Removed old keys from git history
- [ ] Force-pushed cleaned history
- [ ] Tested secure serverless function works
- [ ] Set up OpenAI spending limits 
- [ ] Enabled GitHub secret scanning
- [ ] Checked all other public repos for keys
- [ ] Updated any apps using the old key

---

**You're now protected!** Your API key is encrypted and server-side only. Nobody can access it from your website anymore.
