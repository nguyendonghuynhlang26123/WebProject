const express = require("express");
const app = express();
const port = 3000;
const post = require("./server/modules/posts/controller/post.api");
const bodyParser = require("body-parser");

// mongoose connect
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://admin:admin2020@cluster0.clc8a.azure.mongodb.net/pen-daily?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app use
app.use(bodyParser.urlencoded());
app.use("/post", post);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", function (req, res) {
  res.render("homePage/homePage", { link: "style/css/style.css" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
