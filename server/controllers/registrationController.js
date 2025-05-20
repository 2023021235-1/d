const Mailjet = require('node-mailjet');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Mailjet client
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

const handleRegistration = async (req, res) => {
  const formData = req.body;

  // --- Input Validation (Basic Example) ---
  if (!formData.name || !formData.email || !formData.course) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Sender settings (use the same validated sender for both emails)
  const senderEmail = 'himanshuu932@gmail.com';
  const senderName = 'Registration System';

  // --- Prepare common email content parts ---
  let textPartContent = 'New Registration Details:\n\n';
  let htmlPartContent = '<h3>New Registration Submission</h3>' +
    '<table border="1" cellpadding="5" cellspacing="0">';

  for (const [key, value] of Object.entries(formData)) {
    if (key === 'declaration') continue;
    const label = key.charAt(0).toUpperCase() + key.slice(1)
      .replace(/([A-Z])/g, ' $1').trim();
    textPartContent += `${label}: ${value}\n`;
    htmlPartContent += `<tr><td><strong>${label}</strong></td><td>${value || 'N/A'}</td></tr>`;
  }
  htmlPartContent += '</table>';

  // --- Build Messages array for admin and user ---
  const messages = [];

  // 1. Admin notification
  messages.push({
    From: { Email: senderEmail, Name: senderName },
    To: [{ Email: '2023021235@mmmut.ac.in', Name: 'Admin/Recipient' }],
    Subject: `New Course Registration: ${formData.name} - ${formData.course}`,
    TextPart: textPartContent,
    HTMLPart: htmlPartContent,
  });

  // 2. Confirmation to registrant
  const userText = `Dear ${formData.name},\n\n` +
    `Thank you for registering for the ${formData.course} course. ` +
    `We have received your details and will be in touch shortly.\n\n` +
    `Best regards,\n${senderName}`;
  const userHtml = `<p>Dear ${formData.name},</p>` +
    `<p>Thank you for registering for the <strong>${formData.course}</strong> course. ` +
    `We have received your details and will be in touch shortly.</p>` +
    `<p>Best regards,<br/>${senderName}</p>`;

  messages.push({
    From: { Email: senderEmail, Name: senderName },
    To: [{ Email: formData.email, Name: formData.name }],
    Subject: `Registration Confirmation: ${formData.course}`,
    TextPart: userText,
    HTMLPart: userHtml,
  });

  // --- Send both emails in one API call ---
  try {
    const response = await mailjet
      .post('send', { version: 'v3.1' })
      .request({ Messages: messages });

    console.log('Mailjet API Response:', response.body);

    // Check statuses for both messages
    const statuses = response.body.Messages.map(msg => msg.Status);
    if (statuses.every(status => status === 'success')) {
      return res.status(200).json({ message: 'Registration successful and emails sent!', data: response.body });
    }

    // If any failed
    console.error('One or more messages failed:', response.body.Messages);
    return res.status(500).json({
      message: 'Registration recorded, but email sending issues occurred.',
      errorDetails: response.body.Messages,
    });
  } catch (err) {
    console.error('Error sending email via Mailjet:', err.statusCode, err.message, err);
    return res.status(err.statusCode || 500).json({
      message: 'Failed to send registration emails.',
      error: err.message,
    });
  }
};

module.exports = { handleRegistration };
  