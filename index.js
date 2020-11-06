const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", function (req, res) {
  res.render("homePage/homePage");
});

<<<<<<< HEAD
=======
app.get("/post/", function (req, res) {
  res.render("post/post");
});

>>>>>>> 37ef47623312a411bfcb00866618b2efc211824e
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
