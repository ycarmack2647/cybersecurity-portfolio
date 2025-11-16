# Website Deployment Guide

This guide covers free and simple ways to deploy your cybersecurity portfolio website.

## Option 1: GitHub Pages (Recommended - Free)

### Steps:
1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository**:
   - Click "New repository"
   - Name it (e.g., "cybersecurity-portfolio")
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README
3. **Upload your files**:
   ```bash
   cd "/Users/yashoncarmack/Documents/Cybersecurity Website Project"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cybersecurity-portfolio.git
   git push -u origin main
   ```
4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
5. **Your site will be live at**: `https://YOUR_USERNAME.github.io/cybersecurity-portfolio`

**Note**: Make sure your PDF file is included in the repository!

---

## Option 2: Netlify (Easiest - Free)

### Steps:
1. **Go to**: https://www.netlify.com
2. **Sign up** (free account)
3. **Deploy**:
   - Drag and drop your entire project folder onto the Netlify dashboard
   - OR connect your GitHub repository for automatic deployments
4. **Your site is live instantly** at: `https://random-name.netlify.app`
5. **Custom domain** (optional): Add your own domain in Site settings

**Advantages**: 
- Instant deployment
- Automatic HTTPS
- Free custom domain support
- Continuous deployment from GitHub

---

## Option 3: Vercel (Free)

### Steps:
1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Import your repository**:
   - Click "New Project"
   - Select your repository
   - Click "Deploy"
4. **Your site is live** at: `https://your-project.vercel.app`

**Advantages**:
- Fast global CDN
- Automatic HTTPS
- Easy GitHub integration
- Free custom domains

---

## Option 4: Cloudflare Pages (Free)

### Steps:
1. **Go to**: https://pages.cloudflare.com
2. **Sign up** (free)
3. **Create a project**:
   - Connect your GitHub repository
   - Or upload files directly
4. **Deploy** - Your site is live instantly

**Advantages**:
- Unlimited bandwidth
- Fast global CDN
- Free SSL certificates

---

## Option 5: Surge.sh (Command Line - Free)

### Steps:
1. **Install Surge**:
   ```bash
   npm install -g surge
   ```
2. **Deploy**:
   ```bash
   cd "/Users/yashoncarmack/Documents/Cybersecurity Website Project"
   surge
   ```
3. **Follow prompts**:
   - Enter email and password (creates account)
   - Choose a domain name (e.g., `yourname.surge.sh`)
4. **Done!** Your site is live

**Advantages**:
- Very fast deployment
- Simple command-line tool
- Free subdomain

---

## Important Notes Before Deploying:

### 1. **Include Your PDF File**
Make sure `Cloud Security Professional .pdf` is in your project directory before deploying.

### 2. **Test Locally First**
Make sure everything works on `http://localhost:8000` before deploying.

### 3. **File Structure**
Your project should have:
- `index.html` (main file)
- `styles.css`
- `script.js`
- `Cloud Security Professional .pdf` (resume)

### 4. **GitHub Repository Setup** (if using Git)
Create a `.gitignore` file to exclude unnecessary files:
```
.DS_Store
*.log
node_modules/
```

---

## Recommended: GitHub Pages + Netlify

**Best approach**: 
1. Push to GitHub (for version control)
2. Connect to Netlify (for easy deployment and custom domain)

This gives you:
- ✅ Version control
- ✅ Easy updates
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Automatic HTTPS

---

## Quick Start Commands (GitHub Pages)

If you want to deploy to GitHub Pages right now:

```bash
cd "/Users/yashoncarmack/Documents/Cybersecurity Website Project"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio website"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings!

---

## Need Help?

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs

