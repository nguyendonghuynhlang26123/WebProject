let title_editor;
let main_editor;
let thumbnail_editor;
const HOMEPAGE = 0;
const PREVIEW = 1;

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
    items: ["link"],
  },
  language: "en",
  licenseKey: "",
})
  .then((editor) => {
    title_editor = editor;
  })
  .catch((err) => {
    console.error(err.stack);
  });

BalloonBlockEditor.create(document.querySelector("#thumbnail-editor"), {
  toolbar: {
    items: ["|", "link"],
  },
  removePlugins: ["Title"],
  language: "en",
  blockToolbar: ["imageUpload", "mediaEmbed"],
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: "/upload/post-image",
  },
  image: { styles: ["alignLeft", "alignCenter", "alignRight"] },
  licenseKey: "",
})
  .then((editor) => {
    thumbnail_editor = editor;
  })
  .catch((err) => {
    console.error(err.stack);
  });

/** FUNCTIONALITY---------------------------*/
document
  .getElementsByClassName("btn-subscribe")[0]
  .addEventListener("click", (ev) => {
    let check = document.getElementById("modal-toggle").checked;
    document.getElementById("modal-toggle").checked = !check;
  });

const saveEditorAndRedirect = (id, editorData, redirectUrl) => {
  sendRequest("PUT", "/post/" + id, editorData)
    .then(function (data) {
      console.log(redirectUrl);
      window.location.href = redirectUrl;
    })
    .catch((err) => {
      alert("Sorry! Something stupid happen");
      console.error("Save Editor content: ", err);
    });
};

const getThumbnails = (htmlText) => {
  let element = document.createElement("div");
  element.innerHTML = htmlText;
  let imgElement = element.querySelector("img");
  let captionElement = element.querySelector("figcaption");
  console.log(element);
  alert(JSON.stringify(element));
  let result = [];
  if (imgElement !== null) result.push(imgElement.getAttribute("src"));
  else result.push(null);
  if (captionElement !== null) result.push(imgElement.textContent);
  else result.push("");
  return result;
};

const htmlToStrings = (htmlText) => {
  let splitting = htmlText.replace(/(<([^>]+)>)/gi, " ").split("  ");
  return splitting.map((s) => s.trim("."));
};

/** PUT REQUEST---------------------------*/
const save = (event, status, redirect = null) => {
  event.preventDefault();

  let id = window.location.pathname.split("/")[2];
  let [title, description, ...rest] = htmlToStrings(title_editor.getData());
  let tags = document.querySelectorAll("[tag]");
  tags = Array.from(tags).map((t) => t.textContent.slice(0, -1));
  let category = document.querySelector("[category]").value;
  let post_content = main_editor.getData();
  let [post_thumbnail, thumb_desc] = getThumbnails(thumbnail_editor.getData());

  let data = {
    post_title: title,
    post_description: description,
    post_category: category,
    post_content: post_content,
    post_thumbnail: post_thumbnail,
    post_thumbnail_description: thumb_desc,
    post_tags: tags,
  };

  if (status) data = { ...data, post_status: status };

  if (redirect == PREVIEW) {
    saveEditorAndRedirect(id, data, "/post/" + id + "?mode=preview");
  } else if (redirect == HOMEPAGE) {
    saveEditorAndRedirect(id, data, "/user/writer");
  } else {
    sendRequest("PUT", "/post/" + id, data);
  }
};

document.getElementById("send-btn").addEventListener("click", (e) => {
  save(e, "Publish", PREVIEW);
});

document.querySelector("[save]").addEventListener("click", (e) => {
  save(e);
  displayToast("Save!", 2000);
});

document.querySelector("[save_quit]").addEventListener("click", (e) => {
  save(e, null, HOMEPAGE);
});

document.querySelector("[save]").addEventListener("click", (e) => {
  //TODO delete the post
});
