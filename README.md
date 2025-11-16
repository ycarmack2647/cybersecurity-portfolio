# Cybersecurity Professional Portfolio

A modern, responsive portfolio website for cybersecurity professionals featuring:

- 🎨 Modern dark theme with gradient accents
- 📱 Fully responsive design
- 📧 Working contact form with email backend
- 🚀 Serverless function support (Netlify)
- ⚡ Fast and lightweight

## Features

- **Hero Section** - Eye-catching introduction
- **About Section** - Professional background
- **Skills Section** - Animated skill bars
- **Projects Section** - Featured work with links
- **Resume Section** - PDF download and preview
- **Contact Form** - Functional email backend

## Tech Stack

- HTML5, CSS3, JavaScript
- Express.js (optional local server)
- Netlify Functions (serverless backend)
- Nodemailer (email service)

## Quick Start

### Deploy to Netlify (Recommended)

1. Push this repository to GitHub
2. Connect to Netlify
3. Add environment variables:
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASS` - Gmail App Password
4. Deploy!

See `SIMPLE_SETUP.md` for detailed instructions.

## Local Development

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Environment Variables

For Netlify, add these in Site Settings → Environment Variables:

- `EMAIL_USER` - Your email (e.g., yourname@gmail.com)
- `EMAIL_PASS` - Gmail App Password (16 characters)

## License

ISC

