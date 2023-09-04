require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE, // e.g., 'SendGrid'
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});


module.exports = transporter;