const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thependailynews@gmail.com",
    pass: "thependaily",
  },
});

async function sendMail(mailOption) {
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendMail: sendMail };
