const Mailjet = require('node-mailjet');
const dotenv=require('dotenv');
dotenv.config();
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

mailjet
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
        Email: 'himanshucoder247@gmail.com',
        Name: 'Me',
      },
      To: [
        {
          Email: '2023021235@mmmut.ac.in',
          Name: 'You',
        },
      ],
        Subject: 'My first Mailjet Email!',
        TextPart: 'Greetings from Mailjet!',
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  })
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.error('Error:', err.statusCode);
    console.error(err.response?.res?.statusMessage || err.message);
  });
