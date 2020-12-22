const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const postService = require("../posts/services/post.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thependailynews@gmail.com",
    pass: "thependaily",
  },
});

schedule.scheduleJob("0 0 6 * * *", async function () {
  const content = await postService.getAllNewPost();
  const mailOptions = {
    from: "thependailynews@gmail.com",
    to: "nguyenthaitan9@gmail.com, nguyendonghuynhlang@gmail.com",
    subject: "New news posted in the day",
    html: content,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = schedule;
