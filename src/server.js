const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testmailgowatr@gmail.com',
    pass: 'mnexdwfnhyjqoprd',
  },
});
app.post('/total-flowmeters', (req, res) => {
  const { totalMeters } = req.body;

  const mailOptions = {
    from: 'testmailgowatr@gmail.com',
    to: 'mailtestgowatr@gmail.com',
    subject: 'Active flowmeters count from Cloud Graze',
    text: `Total Active Flowmeters changed. New count: ${totalMeters}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });

  res.send('Email sent successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
