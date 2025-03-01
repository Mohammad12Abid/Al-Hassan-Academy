const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit_form', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).send("All fields are required!");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Change as per your email provider
        auth: {
            user: 'your_email@gmail.com', // Replace with your email
            pass: 'your_password' // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'info@easytutorialspro.com',
        to: 'avinash6252@gmail.com',
        subject: "New Form Submission",
        text: `User Name: ${name}\nUser Email: ${email}\nSubject: ${subject}\nUser Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.redirect('/contact.html');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
