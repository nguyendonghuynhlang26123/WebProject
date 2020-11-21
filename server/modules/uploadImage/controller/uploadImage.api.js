const express = require("express");
const router = express.Router();
const upload = require("../uploadMiddleware");
const resize = require("../resizeImage");

router.post("/post-image", (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    //Display uploaded image for user validation
    let data = await Promise.all([
      resize(req.file.path, req.file.filename, 780),
      resize(req.file.path, req.file.filename, 360),
    ]).catch((e) => {
      console.log(e);
      return res.send(e);
    });
    return res.json({
      url: `/upload/${req.file.filename}`,
      urlResize780: data[0] || null,
      urlResize360: data[1] || null,
    });
  });
});

module.exports = router;
