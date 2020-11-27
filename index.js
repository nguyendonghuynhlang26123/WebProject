const express = require("express");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const post = require("./server/modules/posts/controller/post.api");
const category = require("./server/modules/categories/controller/category.api");
const user = require("./server/modules/users/controller/user.api");
const upload = require("./server/modules/uploadImage/controller/uploadImage.api");
const auth = require("./server/modules/auth/controller/auth.api");
const bodyParser = require("body-parser");
const errorHandler = require("./server/modules/errorHandler/errorHandler");
dotenv.config();
// mongoose connect
const db = require("./db");

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

app.get("/login", (req, res) => {
  res.redirect("auth/login");
});

app.get("/contact", (req, res) => {
  let data = {
    contactUs: ["Contact us", "Ask us anything!"],
    advertise: [
      "Advertising",
      "Our mission is to help brands make an impact in the world",
    ],
    tip: ["Tipping us", "You are contributing to make the world better "],
  };
  res.render("contact_pages/contact", {
    link: "/style/css/advertise.css",
    contact: { title: "Contact us", desc: "Ask us anything!" },
  });
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
