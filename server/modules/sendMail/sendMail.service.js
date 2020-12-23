const nodemailer = require("nodemailer");
const CronJob = require("cron").CronJob;
const postService = require("../posts/services/post.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thependailynews@gmail.com",
    pass: "thependaily",
  },
});

const schedule = new CronJob(
  "0 0 6 * * *",
  async function () {
    const content = await postService.getAllNewPost();
    const mailOptions = {
      from: "thependailynews@gmail.com",
      to: "nguyenthaitan9@gmail.com, nguyendonghuynhlang@gmail.com",
      subject: `New news posted in the day - ${new Date(
        Date.now()
      ).toLocaleDateString()}`,
      html: content,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  null,
  false,
  "Asia/Ho_Chi_Minh"
);

module.exports = schedule;
