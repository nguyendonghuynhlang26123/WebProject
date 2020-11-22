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

//Disable all 'href' of anchor tag
// Object.values(listNavItemElements).forEach((li) =>
//   li.querySelector("a").removeAttribute("href")
// );

//Disable all tab except the default one

//Active function
const setActive = (nextTab) => {
  //remove current active nav item
  document.getElementById(currentTab + "-nav-item").classList.remove(ACTIVE);
  //add active nav item
  document.getElementById(nextTab + "-nav-item").classList.add(ACTIVE);

  //render tab
  document.querySelector(".card-container").setAttribute("id", nextTab);

  currentTab = nextTab;

  let element = document.querySelector('[data-value="delete"]');
  if (currentTab === "trash") {
    element.innerHTML = element.innerHTML.replace(
      "Discard",
      "Permanent remove"
    );
  } else {
    element.innerHTML = element.innerHTML.replace(
      "Permanent remove",
      "Discard"
    );
  }
};

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

//Context menu
const EDIT = "edit";
const PREVIEW = "preview";
const DELETE = "delete";
let selectedCardId = null;

const cards = document.querySelectorAll(".card");
cards.forEach((c) => {
  c.addEventListener("contextmenu", (e) => {
    selectedCardId = e.target.closest(".card").getAttribute("id");
  });
});

const threeDots = document.querySelectorAll(".left_clickable svg");
threeDots.forEach((dot) => {
  dot.addEventListener("click", (ev) => {
    console.log(ev.target.closest(".card").getAttribute("data-value"));
  });
});

const menuItems = document.querySelectorAll(".menu-item a");
menuItems.forEach((item) => {
  item.addEventListener("click", (ev) => {
    let type = ev.target.getAttribute("data-value");

    switch (type) {
      case PREVIEW:
        window.location.href = "/post/" + selectedCardId;
        break;

      case EDIT:
        window.location.href = "/post/" + selectedCardId + "/edit";
        break;

      case DELETE:
        if (currentTab != "trash") {
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
        } else {
          let confimation = confirm(
            "All of the data will be removed from the system.\nDo you still want to delete this post?"
          );
          if (confimation)
            sendRequest("DELETE", "/post/" + selectedCardId)
              .then(function (data) {
                window.location.replace("./writer");
              })
              .catch((err) => {
                alert("Sorry! Something stupid happen");
                console.error("Delete post ", err);
              });
        }
        break;

      default:
        break;
    }
  });
});
