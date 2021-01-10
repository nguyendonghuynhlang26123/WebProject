const express = require("express");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const home = require("./server/modules/home/controller/home.api");
const post = require("./server/modules/posts/controller/post.api");
const category = require("./server/modules/categories/controller/category.api");
const tag = require("./server/modules/tags/controller/tag.api");
const view = require("./server/modules/views/controller/view.api");
const user = require("./server/modules/users/controller/user.api");
const upload = require("./server/modules/uploadImage/controller/uploadImage.api");
const auth = require("./server/modules/auth/controller/auth.api");
const errorHandler = require("./server/modules/errorHandler/errorHandler");
const schedule = require("./server/modules/sendMail/schedule");
const search = require("./server/modules/search/controller/search.api");
const contact = require("./server/modules/contact/controller/contact.api");
const subscriber = require("./server/modules/subcribers/controller/subcriber.api");

const port = process.env.PORT || 3000;
dotenv.config();

// mongoose connect
const db = require("./db");

schedule.start();
// app use
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "what does the cat says? Meow meow meow",
  })
);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home);
app.use("/auth", auth);
app.use("/post", post);
app.use("/category", category);
app.use("/tag", tag);
app.use("/upload", upload);
app.use("/user", user);
app.use("/contact", contact);
app.use("/search", search);
app.use("/subscribe", subscriber);
app.use("/view", view);

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/login", (req, res) => {
  res.redirect("auth/login");
});

app.get("/admin/:tab", (req, res) => {
  res.render("./adminPages/dashboard", { tab: req.params.tab });
});

app.get("*", function (req, res, next) {
  let err = new Error("Page not found");
  err.statusCode = 404;

  next(err);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`The pen daily is listening at http://localhost:${port}`);
});
