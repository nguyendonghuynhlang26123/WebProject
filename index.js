const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", function (req, res) {
  res.render("homePage/homePage", { link: "style/css/style.css" });
});

app.get("/post/", function (req, res) {
  res.render("post/post", { link: "../style/css/post.css" });
});

app.get("/post/", function (req, res) {
  res.render("post/post");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
