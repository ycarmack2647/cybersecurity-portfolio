// Secure Netlify Serverless Function for Contact Form
const nodemailer = require('nodemailer');

// Sanitize HTML to prevent XSS attacks
function sanitizeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate and sanitize input
function validateInput(name, email, subject, message) {
    const errors = [];

    // Name validation
    if (!name || typeof name !== 'string') {
        errors.push('Name is required');
    } else if (name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    } else if (name.length > 100) {
        errors.push('Name is too long');
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
    } else if (!isValidEmail(email.trim())) {
        errors.push('Invalid email format');
    } else if (email.length > 254) {
        errors.push('Email is too long');
    }

    // Subject validation
    if (!subject || typeof subject !== 'string') {
        errors.push('Subject is required');
    } else if (subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters');
    } else if (subject.length > 200) {
        errors.push('Subject is too long');
    }

    // Message validation
    if (!message || typeof message !== 'string') {
        errors.push('Message is required');
    } else if (message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    } else if (message.length > 5000) {
        errors.push('Message is too long (max 5000 characters)');
    }

    return errors;
}

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Max-Age': '86400'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse and validate JSON
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (e) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Invalid request format' 
                })
            };
        }

        const { name, email, subject, message } = body;

        // Validate input
        const validationErrors = validateInput(name, email, subject, message);
        if (validationErrors.length > 0) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: validationErrors[0] // Return first error
                })
            };
        }

        // Sanitize inputs
        const sanitizedName = sanitizeHtml(name.trim());
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedSubject = sanitizeHtml(subject.trim());
        const sanitizedMessage = sanitizeHtml(message.trim());

        // Check environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured');
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Server configuration error' 
                })
            };
        }

        // Email configuration
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content with sanitized data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `Portfolio Contact: ${sanitizedSubject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${sanitizedName}</p>
                <p><strong>Email:</strong> ${sanitizedEmail}</p>
                <p><strong>Subject:</strong> ${sanitizedSubject}</p>
                <p><strong>Message:</strong></p>
                <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>You can reply directly to this email to respond to ${sanitizedName}.</em></p>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${sanitizedName}
                Email: ${sanitizedEmail}
                Subject: ${sanitizedSubject}
                
                Message:
                ${message.trim()}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Message sent successfully!' 
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        // Don't expose internal error details to client
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Failed to send message. Please try again later.' 
            })
        };
    }
};

