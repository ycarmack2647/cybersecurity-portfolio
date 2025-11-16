# Backend Setup Guide

This guide will help you set up a simple backend for your contact form.

## Quick Start

### 1. Install Dependencies

```bash
cd "/Users/yashoncarmack/Documents/Cybersecurity Website Project"
npm install
```

### 2. Set Up Email Configuration

Create a `.env` file in your project root:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

#### For Gmail Users:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable it if not already)
3. Go to **App Passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASS`

**Note:** Don't use your regular Gmail password - you need an App Password!

### 3. Update Email Recipient

Edit `server.js` and change the recipient email:

```javascript
to: 'yashoncarmack@gmail.com', // Change this to your email
```

### 4. Start the Server

```bash
# Development mode (auto-restarts on changes)
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:3000`

### 5. Test the Contact Form

1. Open your website: `http://localhost:3000`
2. Fill out the contact form
3. Submit and check your email!

---

## Alternative: Serverless Functions (Even Simpler!)

If you want to deploy without managing a server, use serverless functions:

### Option A: Netlify Functions

1. Create `netlify/functions/contact.js`:

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, subject, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'yashoncarmack@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
```

2. Update `script.js` to use `/api/contact` (Netlify automatically creates this route)

### Option B: Vercel Functions

1. Create `api/contact.js`:

```javascript
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'yashoncarmack@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
```

2. Update `script.js` to use `/api/contact`

---

## Deployment Options

### With Express.js Backend:

**Option 1: Railway** (Free tier available)
- Push to GitHub
- Connect to Railway
- Add environment variables
- Deploy!

**Option 2: Render** (Free tier)
- Connect GitHub repo
- Set build command: `npm install`
- Set start command: `npm start`
- Add environment variables

**Option 3: Heroku** (Paid, but has free alternatives)
- Similar to Render

### With Serverless Functions:

**Netlify or Vercel** - Just push to GitHub and they handle everything!

---

## Environment Variables for Production

When deploying, make sure to set these environment variables:

- `EMAIL_USER` - Your email address
- `EMAIL_PASS` - Your app password
- `PORT` - Server port (usually auto-set by hosting provider)

---

## Troubleshooting

### Email not sending?

1. **Check App Password**: Make sure you're using an App Password, not your regular password
2. **Check 2FA**: Gmail requires 2-Step Verification for App Passwords
3. **Check .env file**: Make sure it's in the project root and has correct values
4. **Check server logs**: Look for error messages in the terminal

### CORS errors?

The server already has CORS enabled. If you still see errors:
- Make sure the API URL in `script.js` matches your server URL
- Check that the server is running

### Port already in use?

Change the PORT in `.env` or use:
```bash
PORT=3001 npm start
```

---

## Testing

Test the API directly:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

---

## Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use App Passwords** - Never use your main email password
3. **Add rate limiting** - Consider adding rate limiting for production
4. **Add validation** - The backend validates input, but you can add more

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env` file with your email credentials
3. ✅ Start server: `npm start`
4. ✅ Test the contact form
5. ✅ Deploy to your chosen platform

Need help? Check the server logs for error messages!

