let title_editor;
let main_editor;

const imageConfig = {
  // Configure the available styles.
  styles: ["alignLeft", "alignCenter", "alignRight"],

  // Configure the available image resize options.
  resizeOptions: [
    {
      name: "imageResize:original",
      label: "Original",
      value: null,
    },
    {
      name: "imageResize:50",
      label: "50%",
      value: "50",
    },
    {
      name: "imageResize:75",
      label: "75%",
      value: "75",
    },
  ],

  // You need to configure the image toolbar, too, so it shows the new style
  // buttons as well as the resize buttons.
  toolbar: [
    "imageStyle:alignLeft",
    "imageStyle:alignCenter",
    "imageStyle:alignRight",
    "|",
    "imageResize",
    "|",
    "imageTextAlternative",
  ],
};

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
  image: imageConfig,
  licenseKey: "",
})
  .then((editor) => {
    main_editor = editor;
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
  image: imageConfig,
  licenseKey: "",
})
  .then((editor) => {
    title_editor = editor;
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

const saveEditorContent = (id, editorData) => {
  sendRequest("PUT", "/post/" + id, editorData)
    .then(function (data) {
      console.log("PUI PUI");
    })
    .catch((err) => {
      console.error("Save Editor content: ", err);
    });
};

const htmlToStrings = (htmlText) => {
  console.log(htmlText);
  let splitting = htmlText.replace(/(<([^>]+)>)/gi, " ").split("  ");
  return splitting.map((s) => s.trim("."));
};

/** PUT REQUEST---------------------------*/
const save = (event) => {
  event.preventDefault();

  let id = window.location.pathname.split("/")[2];
  let [title, description, ...rest] = htmlToStrings(title_editor.getData());
  let tags = document.querySelectorAll("[tag]");
  tags = Array.from(tags).map((t) => t.textContent.slice(0, -1));
  let category = document.querySelector("[category]").value;
  let post_content = main_editor.getData();

  console.log("TITLE", title);
  console.log("Description", description);
  console.log("Etc", rest);
  console.log("CONTENT", post_content);
  console.log("Category", category);
  console.log("Tags", tags);

  let data = {
    post_title: title,
    post_description: description,
    post_category: category,
    post_content: post_content,
    post_thumbnail: "http://localhost:3000/images/alt.png",
    post_thumbnail_description: "Thumbnail description",
    post_tags: tags,
    post_status: "Publish",
  };
  saveEditorContent(id, data);
};

document.getElementById("send-btn").addEventListener("click", (e) => {
  save(e);
});
