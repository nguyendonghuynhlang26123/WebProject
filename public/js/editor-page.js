/** EDITOR BOX---------------------------*/
BalloonBlockEditor.create(document.querySelector("#main-editor"), {
  removePlugins: ["Title"],
  toolbar: {
    items: ["heading", "|", "bold", "italic", "link", "blockQuote"],
  },
  language: "en",
  blockToolbar: [
    "imageUpload",
    "mediaEmbed",
    "|",
    "numberedList",
    "bulletedList",
  ],
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: "/upload/post-image",
  },
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
  },
  licenseKey: "",
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((err) => {
    console.error(err.stack);
  });

BalloonBlockEditor.create(document.querySelector("#title-editor"), {
  title: {
    placeholder: "Post title",
  },
  placeholder: "Post description",
  toolbar: {
    items: [],
  },
  language: "en",
  blockToolbar: ["imageUpload", "mediaEmbed"],
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: "/upload/post-image",
  },
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
  },
  licenseKey: "",
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((err) => {
    console.error(err.stack);
  });

/** FUNCTIONING---------------------------*/
document
  .getElementsByClassName("btn-subscribe")[0]
  .addEventListener("click", (ev) => {
    let check = document.getElementById("modal-toggle").checked;
    document.getElementById("modal-toggle").checked = !check;
  });
