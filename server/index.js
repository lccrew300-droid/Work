import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-invite', async (req, res) => {
  const { to, groupName, inviteLink } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `Invitation: Join ${groupName} - Credential Registry`,
    html: `
      <div style="font-family: sans-serif; padding: 40px; background: #f8fafc; color: #1e293b;">
        <h2 style="color: #2563eb;">You've been invited!</h2>
        <p>Hello,</p>
        <p>You have been added to the <strong>${groupName}</strong> credential group.</p>
        <p>Please click the button below to accept your invitation and access your credentials:</p>
        <a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">Accept Invitation</a>
        <p style="margin-top: 40px; font-size: 12px; color: #64748b;">If you cannot click the button, copy and paste this link: <br/> ${inviteLink}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Email Relay Server running on port ${PORT}`));
