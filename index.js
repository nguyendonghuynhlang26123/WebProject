const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const home = require('./server/modules/home/controller/home.api');
const post = require('./server/modules/posts/controller/post.api');
const category = require('./server/modules/categories/controller/category.api');
const user = require('./server/modules/users/controller/user.api');
const upload = require('./server/modules/uploadImage/controller/uploadImage.api');
const auth = require('./server/modules/auth/controller/auth.api');
const errorHandler = require('./server/modules/errorHandler/errorHandler');
const schedule = require('./server/modules/sendMail/sendMail.service');
const search = require('./server/modules/search/controller/search.api');
const contact = require('./server/modules/contact/controller/contact.api');

const port = process.env.PORT || 3000;
<<<<<<< HEAD
=======
const post = require("./server/modules/posts/controller/post.api");
const category = require("./server/modules/categories/controller/category.api");
const user = require("./server/modules/users/controller/user.api");
const upload = require("./server/modules/uploadImage/controller/uploadImage.api");
const auth = require("./server/modules/auth/controller/auth.api");
const subcriber = require("./server/modules/subcribers/controller/subcriber.api");
const bodyParser = require("body-parser");
const errorHandler = require("./server/modules/errorHandler/errorHandler");
>>>>>>> 6b6eae750cad2055bc6461a916e473500d73b9c0
dotenv.config();

// mongoose connect
const db = require('./db');


schedule.start();
// app use
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'what does the cat says? Meow meow meow',
  })
);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use('/', home);
app.use('/auth', auth);
app.use('/post', post);
app.use('/category', category);
app.use('/upload', upload);
app.use('/user', user);
app.use('/contact', contact);
app.use('/search', search);

app.set('view engine', 'ejs');
app.set('views', './pages');

app.get('/login', (req, res) => {
  res.redirect('auth/login');
=======
app.use("/auth", auth);
app.use("/post", post);
app.use("/category", category);
app.use("/upload", upload);
app.use("/user", user);
app.use("/subcriber", subcriber);
app.use("/search", search);

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", async function (req, res) {
  const data = await Promise.all([
    categoryService.getAllCategory("category_name category_slug"),
    postService.getAllPostByViews(
      {
        post_status: "Publish",
      },
      1
    ),
    postService.getAllPost(
      {
        post_status: "Publish",
      },
      null,
      10
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("Lifestyle"),
        post_status: "Publish",
      },
      null,
      3
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("International"),
        post_status: "Publish",
      },
      null,
      6
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("Education"),
        post_status: "Publish",
      },
      null,
      7
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("Sport"),
        post_status: "Publish",
      },
      null,
      3
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("Features"),
        post_status: "Publish",
      },
      null,
      6
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName("Politics"),
        post_status: "Publish",
      },
      null,
      7
    ),
  ]);
  res.render("homePage/homePage", {
    link: "/style/css/style.css",
    list_category: data[0],
    hero: data[1][0],
    topnew: data[2],
    lifestyle: data[3],
    international: data[4],
    education: data[5],
    sport: data[6],
    features: data[7],
    politics: data[8],
  });
});

app.get("/login", (req, res) => {
  res.redirect("auth/login");
});

//MEO MEO
app.get("/contact", (req, res) => {
  let data = {
    contactUs: ["Contact us", "Ask us anything!", "How can I join your team?"],
    advertise: [
      "Advertising",
      "Our mission is to help brands make an impact in the world!",
      "How much it takes to put an ad on our site?",
    ],
    tip: ["Tipping us", "Your contribution makes the world better!", ""],
    correction: [
      "Correcting a post",
      "We apologize for these mistakes!",
      "This post seem to be outdated or inappropriate!",
    ],
  };
  let type = req.query.type || "contactUs";
  res.render("contact_pages/contact", {
    link: "/style/css/advertise.css",
    contact: { title: data[type][0], desc: data[type][1], hint: data[type][2] },
  });
});

//MEO MEO
app.get("/categoryPage", (req, res) => {
  res.render("categoryPages/category_page");
>>>>>>> 6b6eae750cad2055bc6461a916e473500d73b9c0
});

app.get('*', function (req, res, next) {
  let err = new Error('Page not found');
  err.statusCode = 404;

  next(err);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`The pen daily is listening at http://localhost:${port}`);
});
