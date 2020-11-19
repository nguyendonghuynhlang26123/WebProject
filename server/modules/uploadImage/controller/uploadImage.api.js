const express = require("express");
const router = express.Router();
const upload = require("../uploadMiddleware");

router.post("/post-image", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    // Display uploaded image for user validation
    return res.json({
      url: `/upload/${req.file.filename}`,
    });
  });
});

module.exports = router;
