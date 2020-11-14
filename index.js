const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
const post = require("./server/modules/posts/controller/post.api");
const category = require("./server/modules/categories/controller/category.api");
const user = require("./server/modules/users/controller/user.api");
const upload = require("./server/modules/uploadImage/controller/uploadImage.api");
const auth = require("./server/modules/auth/controller/auth.api");
const bodyParser = require("body-parser");
const errorHandler = require("./server/modules/errorHandler/errorHandler");
const authService = require("./server/modules/auth/services/auth.service");

// mongoose connect
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://admin:admin2020@cluster0.clc8a.azure.mongodb.net/pen-daily?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app use
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "what does the cat say? Meow meow meow",
  })
);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/auth", auth);
app.use("/post", post);
app.use("/category", category);
app.use("/upload", upload);
app.use("/user", user);

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", function (req, res) {
  res.render("homePage/homePage", { link: "/style/css/style.css" });
});

app.get("/writer", authService.restrict, (req, res) => {
  res.render("writerPage/dashboard");
});

app.get("*", function (req, res, next) {
  let err = new Error("Page not found");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
