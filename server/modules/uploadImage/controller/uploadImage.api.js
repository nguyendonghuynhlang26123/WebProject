const express = require("express");
const router = express.Router();
const upload = require("../uploadMiddleware");

router.post("/post-image", (req, res) => {
  console.log("UPLOAD", req.file, req.body, req);
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    // Display uploaded image for user validation
    console.log(req.file);
    return res.json({
      url: "",
    });
  });
});

module.exports = router;
