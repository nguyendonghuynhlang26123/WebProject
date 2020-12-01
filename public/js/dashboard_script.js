const mainElement = document.querySelector("main");
const listTabPages = ["home", "draft", "trash"];

const listNavItemElements = {};
listTabPages.forEach(
  (tab) =>
    (listNavItemElements[tab] = document.getElementById(tab + "-nav-item"))
);

let DEFAULT_TAB = "home";
let currentTab = DEFAULT_TAB; // Show current tab
const ACTIVE = "active";
const DISABLE = "disable";
//Active function
const setActive = (nextTab) => {
  //remove current active nav item
  document.getElementById(currentTab + "-nav-item").classList.remove(ACTIVE);
  //add active nav item
  document.getElementById(nextTab + "-nav-item").classList.add(ACTIVE);

  //render tab
  document.querySelector(".card-container").setAttribute("id", nextTab);

  currentTab = nextTab;
  document.querySelector("#page .section-title").textContent = currentTab;
  setContextMenu(currentTab);
};
const EDIT = "edit";
const PREVIEW = "preview";
const RESTORE = "restore";
const DISCARD = "discard";
const REMOVE = "remove";
const setContextMenu = (tab) => {
  const menu = document.getElementById("menu");
  let listItems = [EDIT, PREVIEW, RESTORE, DISCARD, REMOVE];
  let disableItems = [];

  switch (tab) {
    case "home":
      disableItems = [RESTORE, REMOVE];
      break;
    case "draft":
      disableItems = [REMOVE, RESTORE];
      break;
    case "trash":
      disableItems = [EDIT, DISCARD];
      break;
    default:
      break;
  }

  listItems.forEach((item) => {
    const itemElement = menu.querySelector(`[data-value="${item}"]`);

    console.log(itemElement);
    if (!disableItems.includes(item)) {
      itemElement.classList.remove(DISABLE);
    } else {
      itemElement.classList.add(DISABLE);
    }
  });
};

setContextMenu(currentTab);
//Set event listener
Object.values(listNavItemElements).forEach((e) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target.closest(".nav__item");
    let tabName = target.id.replace("-nav-item", "");
    setActive(tabName);
  });
});

//Profile button
const editButton = document.getElementById("edit");
editButton.addEventListener("click", (event) => {
  editButton.classList.toggle("on");
  document.getElementsByClassName("profile")[0].classList.toggle("small");
});

const submitButton = document.getElementById("submit-profile-btn");
submitButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  let form = ev.target.closest("form");
  let data = {
    email: form.querySelector('[type="email"]').value,
    first_name: form.querySelector('[name="fname"]').value,
    last_name: form.querySelector('[name="lname"]').value,
  };

  sendRequest("PUT", "/user", {
    ...data,
  })
    .then((data) => {
      window.location.reload();
    })
    .catch((err) => {
      alert("Sorry! Something stupid happen");
      console.error("Update user profile ", err);
    });
});

//Context menu
let selectedCardId = null;

const cards = document.querySelectorAll(".card");
cards.forEach((c) => {
  c.addEventListener("contextmenu", (e) => {
    selectedCardId = e.target.closest(".card").getAttribute("id");
  });
});

const threeDots = document.querySelectorAll('.left_clickable svg');
threeDots.forEach((dot) => { 
  dot.addEventListener("click", (ev) => {
    selectedCardId = ev.target.closest(".card").getAttribute("id");
    console.log(selectedCardId);
  });
});

const menuItems = document.querySelectorAll(".menu-item a");
menuItems.forEach((item) => {
  item.addEventListener("click", (ev) => {
    let type = ev.target.getAttribute("data-value");
    console.log(type);

    switch (type) {
      case PREVIEW:
        window.location.href = "/post/" + selectedCardId + "?mode=preview";
        break;

      case EDIT:
        window.location.href = "/post/" + selectedCardId + "/edit";
        break;

      case RESTORE:
        sendRequest("PUT", "/post/" + selectedCardId, {
          post_status: "Draft",
        })
          .then(function (data) {
            window.location.reload();
          })
          .catch((err) => {
            alert("Sorry! Something stupid happen");
            console.error("Discard post ", err);
          });
        break;

      case DISCARD:
        sendRequest("PUT", "/post/" + selectedCardId, {
          post_status: "Trash",
        })
          .then(function (data) {
            window.location.reload();
          })
          .catch((err) => {
            alert("Sorry! Something stupid happen");
            console.error("Discard post ", err);
          });
        break;

      case REMOVE:
        let confirmation = confirm(
          "All of the data will be removed from the system.\nDo you still want to delete this post?"
        );
        if (confirmation)
          sendRequest("DELETE", "/post/" + selectedCardId)
            .then(function (data) {
              window.location.replace("./writer");
            })
            .catch((err) => {
              alert("Sorry! Something stupid happen");
              console.error("Delete post ", err);
            });
      default:
        break;
    }
  });
});
