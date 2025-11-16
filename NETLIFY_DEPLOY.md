# Step-by-Step Netlify Deployment Guide

Follow these steps to deploy your website with a working contact form!

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create account)
2. Click the **+** icon in top right → **New repository**
3. Name it: `cybersecurity-portfolio` (or any name you like)
4. Make it **Public** (required for free hosting)
5. **Don't** check "Initialize with README" (we already have files)
6. Click **Create repository**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/yashoncarmack/Documents/Cybersecurity Website Project"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cybersecurity-portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Or use GitHub Desktop:**
1. Download [GitHub Desktop](https://desktop.github.com)
2. File → Add Local Repository
3. Select your project folder
4. Publish repository to GitHub

## Step 3: Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **Sign up** (free account)
3. Choose **GitHub** to sign in with GitHub
4. Click **Add new site** → **Import an existing project**
5. Select your repository (`cybersecurity-portfolio`)
6. Netlify will auto-detect settings:
   - **Build command**: Leave empty (or `npm install` if you want)
   - **Publish directory**: `.` (current directory)
7. Click **Deploy site**

## Step 4: Add Environment Variables

1. After deployment starts, go to **Site settings**
2. Click **Environment variables** (in Build & deploy section)
3. Click **Add a variable** and add:

   **Variable 1:**
   - Key: `EMAIL_USER`
   - Value: `yashoncarmack@gmail.com` (or your email)

   **Variable 2:**
   - Key: `EMAIL_PASS`
   - Value: `your-16-character-app-password` (see below)

4. Click **Save**

### Get Gmail App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Type "Netlify" and click **Generate**
6. Copy the **16-character password** (looks like: `abcd efgh ijkl mnop`)
7. Paste it as `EMAIL_PASS` in Netlify (remove spaces)

## Step 5: Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for deployment to complete

## Step 6: Test Your Contact Form!

1. Visit your Netlify site (URL will be like: `your-site-name.netlify.app`)
2. Scroll to the Contact section
3. Fill out the form
4. Submit it
5. Check your email (`yashoncarmack@gmail.com`) - you should receive the message!

## Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Follow instructions to connect your domain

## Troubleshooting

### Contact form not working?
- ✅ Check environment variables are set correctly
- ✅ Make sure you're using App Password, not regular password
- ✅ Check Netlify function logs: **Functions** tab → `contact` → **Logs**

### Email not sending?
- ✅ Verify 2-Step Verification is enabled
- ✅ Double-check App Password is correct (no spaces)
- ✅ Check spam folder

### Need to update code?
Just push to GitHub - Netlify will auto-deploy!

```bash
git add .
git commit -m "Update website"
git push
```

## Success! 🎉

Your website is now live with a working contact form!

Your site URL: `https://your-site-name.netlify.app`

