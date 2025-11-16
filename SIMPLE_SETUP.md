# Simple Backend Setup (No Node.js Installation Required!)

This guide uses **Netlify serverless functions** - no need to install Node.js on your computer!

## Option 1: Deploy to Netlify (Easiest - Recommended)

### Step 1: Push to GitHub
1. Create a GitHub repository
2. Push your project files

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://www.netlify.com) and sign up (free)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will auto-detect settings - just click "Deploy"

### Step 3: Add Environment Variables
1. Go to your site on Netlify
2. Click **Site settings** → **Environment variables**
3. Add these variables:
   - `EMAIL_USER` = `yashoncarmack@gmail.com`
   - `EMAIL_PASS` = `your-gmail-app-password`

**To get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already)
3. Go to **App Passwords**
4. Select "Mail" and generate password
5. Copy the 16-character password

### Step 4: Redeploy
After adding environment variables, go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Done! 🎉
Your contact form will now work! Visit your Netlify site and test it.

---

## Option 2: Install Node.js (For Local Testing)

If you want to test locally first:

### Install Node.js:
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended)
3. Install it (follow the installer)

### Then run:
```bash
npm install
npm start
```

Visit `http://localhost:3000` to test locally.

---

## How It Works

- **Local Development**: Uses Express.js server (`server.js`)
- **Production (Netlify)**: Uses serverless function (`netlify/functions/contact.js`)
- **Frontend**: Automatically detects which one to use!

The contact form will:
1. Send emails to `yashoncarmack@gmail.com`
2. Include the sender's email so you can reply
3. Show success/error messages

---

## Testing

1. Fill out the contact form on your website
2. Submit it
3. Check your email (`yashoncarmack@gmail.com`)
4. You should receive the message!

---

## Troubleshooting

### Email not sending?
- ✅ Check that environment variables are set correctly on Netlify
- ✅ Make sure you're using an **App Password**, not your regular Gmail password
- ✅ Verify 2-Step Verification is enabled on your Google account

### Form not submitting?
- ✅ Check browser console for errors (F12 → Console)
- ✅ Make sure the API URL is correct
- ✅ Verify Netlify function is deployed

### Need help?
Check the Netlify function logs:
1. Go to your site on Netlify
2. Click **Functions** tab
3. Click on `contact` function
4. View logs for errors

---

## Next Steps

1. ✅ Deploy to Netlify (or install Node.js for local testing)
2. ✅ Add environment variables
3. ✅ Test the contact form
4. ✅ Share your website!

Your backend is ready! 🚀

