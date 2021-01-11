const CronJob = require("cron").CronJob;
const postService = require("../posts/services/post.service");
const subscriberService = require("../subscribers/services/subscriber.service");
const sendMailService = require("./sendMail.service");

const schedule = new CronJob(
  "0 0 6 * * *",
  async function () {
    const to = await subscriberService.getAllSubscriber();
    if (to == null) return;
    const content = await postService.getAllNewPost();
    const mailOption = {
      from: "thependailynews@gmail.com",
      to: to,
      subject: `New news posted in the day - ${new Date(
        Date.now()
      ).toLocaleDateString()}`,
      html: content,
    };
    sendMailService.sendMail(mailOption);
  },
  null,
  false,
  "Asia/Ho_Chi_Minh"
);

module.exports = schedule;
