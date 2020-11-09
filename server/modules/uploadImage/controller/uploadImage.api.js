const express = require("express");
const router = express.Router();
const upload = require("../uploadMiddleware");

router.post("/post-image", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    // Display uploaded image for user validation
    return res.send(
      `You have uploaded this image: <hr/><img src="${req.file.path}`
    );
  });
});

module.exports = router;
