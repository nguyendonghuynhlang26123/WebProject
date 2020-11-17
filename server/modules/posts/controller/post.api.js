const postService = require("../services/post.service");
const authService = require("../../auth/services/auth.service");
const userService = require("../../users/services/user.service");
const express = require("express");
const router = express.Router();

router.get("/:postId", async function (req, res, next) {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (req.session.userId && req.session.userId == post.post_author._id) {
      res.redirect(`./${post._id}/edit`);
      return;
    }
    res.render("post/post", { link: "/style/css/post.css", post: post });
  } catch (err) {
    next(err);
  }
});

router.get("/:postId/edit", authService.restrict, async function (
  req,
  res,
  next
) {
  try {
    const post = await postService.getPostById(req.params.postId);
    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res) {
  const posts = await postService.getAllPost();
  res.send(posts);
});

router.post("/", authService.restrict, async function (req, res) {
  const post = await postService.createPost(req.session.userId);
  userService.addPostId(req.session.userId, post._id);
  res.send(post);
});

router.put("/:postId", async function (req, res, next) {
  try {
    const result = await postService.updatePostById(
      req.params.postId,
      req.body
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:postId", authService.restrict, async function (
  req,
  res,
  next
) {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (!post || post.post_author != req.session.userId)
      return next({ message: "Access Denied" });
    const result = await postService.deletePost(req.params.postId);
    userService.delPostId(req.session.userId, post._id);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// let data = {
//   post_title: "Dried persimmons: The sun-kissed autumn treat of Da Lat.",
//   post_description:
//     "In the late 190s and early 1990s, several years before the Central     Highlands city of Da Lat became one of Vietnam’s biggest tourism     draws, nearly every local household in the city proudly grew     persimmon trees.",
//   post_category: "5faceb2f14977a06f4db7307",
//   post_content: `<p>
//         Though barely taken care of by locals, the persimmon trees still
//         manage to bear fruit each autumn, adding a tinge of orange to the
//         hilly town’s rustic charm.
//       </p>
//       <p>
//         About 30 or 40 years ago, Da Lat’s persimmon trees, neatly grown in
//         front of newly built households, were one of the first things to
//         catch visitors’ eyes.
//       </p>
//       <p>
//         For locals, the trees not only added a pop of color to their
//         gardens, but also provided shade and delicious fruits.
//       </p>
//       <p>
//         “Persimmon trees were a cultural entity that shaped the lifestyle of
//         Da Lat residents,” said Nguyen Huu Tranh, author of 'Da Lat Nam Xua
//         (Old Times of Da Lat),' a quintessential study of the highland city.
//       </p>
//       <p>
//         It takes nearly a decade for a persimmon tree to mature, yet
//         persimmons themselves are sold for a mere VND5,000-10,000
//         (US$0.21-43) per kilogram.
//       </p>
//       <p>
//         With each tree only capable of producing up to 100 kilograms per
//         year, it is obvious most locals grew persimmons out of love for the
//         fruit rather than financial return.
//       </p>
//       <p>
//       <figure>
//         <img src="../images/post1.jpg" alt="" />
//         <figcaption>
//           The dehydration room to make Hoshigaki from persimmons in Da Lat
//           City, Vietnam. Photo: Mai Vinh
//         </figcaption>
//       </figure>
//       </p>

//       <p>
//         “The food culture, gardening culture, and the whole manneristic
//         lifestyle of Da Lat people are essentialized in this variety of
//         tree,” Tranh said.
//       </p>

//       <p><b>An ode to the fruit</b></p>

//       <p>
//         Dang Thi Thu Van, owner of a specialty persimmon shop on Le Van
//         Street in Da Lat, has managed to earn a living off producing
//         ‘crunchy’ persimmon – a version of the fruit that is&nbsp;cured to
//         remove its unbearably acrid taste.
//       </p>

//       <p>Van’s curing process is relatively straightforward.&nbsp;</p>

//       <p>
//         She picks the fruit when it&nbsp;turns light yellow and leaves
//         it&nbsp;in an air-tight bag for five days to break down its tannins
//         -- the astringent organic compounds abundant in fresh-off-the-twig
//         persimmon. These five days also give the persimmon time to ripen a
//         bit more and achieve a crunchy texture.
//       </p>

//       <p>
//         According to Van, persimmons left to fully ripen on the tree, as
//         well as picked half-ripe persimmons that have been left in aerated
//         spaces, develop a soft, custardy mouthfeel, yellow pericarp, and a
//         sweet, juicy flavor.
//       </p>

//       <p>
//         On top of that, the skin of the fruit turns a vivid shade of pink,
//         hence its Vietnamese name 'trai hong'&nbsp;or 'pink fruit.'
//       </p>

//       <p>
//         Van shared that growing up she often resorted&nbsp;to fully ripe
//         persimmons during times when food was scarce.
//       </p>

//       <p>
//         In Da Lat, persimmon harvest seasons begin&nbsp;in mid-September and
//         end&nbsp;in late November or early December, just as the city’s
//         rainy season is ending.&nbsp;
//       </p>

//       <p>
//         During this time, farms in Da Lat spend a great deal of time making
//         dried persimmons by sun-drying pieces of the fruit before fully
//         dehydrating them in a charcoal oven.&nbsp;
//       </p>

//       <p>Each batch takes approximately five days to make.</p>

//       <p>
//         During Tet holiday – the Vietnamese Lunar New Year celebration –
//         families in Da Lat often gather and tell stories over plates of
//         dried persimmons and warm cups of tea.
//       </p>

//       <p>
//       <figure>
//         <img src="../images/post2.jpg" alt="" />
//         <figcaption><em>A farmer collects persimmons in Da Lat City. Photo: </em>Mai Vinh / Tuoi Tre</figcaption>
//         </figcaption>
//       </figure>
//       </p>

//       <p>Van’s children, who left their town to work in finance and banking, have all come back to take on the family
//         business.</p>

//       <p>Van and her daughter Lan Anh dry their persimmons at a processing facility deep inside a persimmon plantation
//         in Da Lat’s Khe Sanh Valley.</p>

//       <p>The fact that she has not sold the land despite the current local real estate boom coupled with the low
//         profitability of persimmons is&nbsp;an ode to her appreciation for the fruit.</p>

//       <p>The duo disapproves of the ‘industrialized’ way of dehydrating persimmons by using honeycomb charcoal as fuel
//         in order to decrease the amount of time it takes to produce a batch, claiming that using wood charcoal and hot
//         air produces a final product that is more tender and chewy.</p>`,
//   post_thumbnail: "http://localhost:3000/images/lifestyle3.jpg",
//   post_thumbnail_description: "The dehydration room to make Hoshigaki from persimmons in Da Lat City, Vietnam. Photo: Mai Vinh",
//   post_author: "Xuan Tung - Mai Vinh",
//   post_date: Date.now(),
//   post_tags: ["trending", "Dalat", "Hoshigaki", "Persimmons"],
// };
// postService.createPost(
//   data.post_title,
//   data.post_description,
//   data.post_category,
//   data.post_content,
//   data.post_thumbnail,
//   data.post_thumbnail_description,
//   data.post_author,
//   data.post_date,
//   data.post_tags
// );
//postService.getPostById("5faceef6fa85752b7cff9ade").then((d) => console.log(d.post_category[0].category_name));
