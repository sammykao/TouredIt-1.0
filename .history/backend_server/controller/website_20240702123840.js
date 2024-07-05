const db = require("./../database/db");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();


exports.insertClientAccounts = async (req, res) => {S
             <li>Email: ${email}</li>
           </ul>
           <p>Message:</p>
           <p>${message}</p>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).send({message: 'Error sending email', error: err});
    } else {
      console.log(info);
      res.status(200).send({message: 'Email sent successfully'});
    }
  });
};