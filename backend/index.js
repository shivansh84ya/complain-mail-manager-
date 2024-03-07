const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors")

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { name, complaint, contact, email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivanshchourasia84@gmail.com', // Replace with your email
      pass: 'ajnp xtzw jobf lqxg', // Replace with your password or use an app password
    },
  });

  const mailOptions = {
    from: `${email}`, // Replace with your email
    to: 'shivanshchourasia84@gmail.com', // Replace with the email where you want to receive complaints
    subject: 'New Complaint',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #007bff;">New Complaint </h2>
      <p style="font-size: 16px;">Below are the details of the new complaint:</p>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 10px;">
          <strong>Name:</strong> ${name}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Complaint:</strong> ${complaint}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Contact:</strong> ${contact}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Email:</strong> ${email}
        </li>
      </ul>
    </div>
  `, 
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
