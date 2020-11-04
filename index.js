var express = require("express");
var app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", function (req, res) {
  res.render("homePage/homePage");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
