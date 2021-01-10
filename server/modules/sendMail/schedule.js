const CronJob = require("cron").CronJob;
const postService = require("../posts/services/post.service");
const sendMailService = require("./sendMail.service");

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
    sendMailService.sendMail(mailOptions);
  },
  null,
  false,
  "Asia/Ho_Chi_Minh"
);

module.exports = schedule;
