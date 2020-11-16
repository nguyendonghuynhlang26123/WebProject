const mainElement = document.querySelector("main");
const listTabPages = ["home", "draft", "trash"];
const listTabElements = {};
listTabPages.forEach(
  (tab) => (listTabElements[tab] = document.getElementById(tab + "-page"))
);
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
console.log(listNavItemElements);
Object.values(listNavItemElements).forEach((li) =>
  li.querySelector("a").removeAttribute("href")
);

//Disable all tab except the default one
listTabPages.forEach((tab) => {
  if (tab !== DEFAULT_TAB) listTabElements[tab].classList.add(DISABLE);
});

//Active function
const setActive = (nextTab) => {
  //remove current active
  document.getElementById(currentTab + "-nav-item").classList.remove(ACTIVE);
  //add active class
  document.getElementById(nextTab + "-nav-item").classList.add(ACTIVE);
  //render tab
  document.getElementById(currentTab + "-page").classList.add(DISABLE);
  //disable tab
  document.getElementById(nextTab + "-page").classList.remove(DISABLE);

  currentTab = nextTab;
};

//Set event listener
Object.values(listNavItemElements).forEach((e) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target.closest(".nav__item");
    console.log(event.target);
    let tabName = target.id.replace("-nav-item", "");
    console.log(target.id, tabName);
    setActive(tabName);
  });
});

//Profile button
const editButton = document.getElementById("edit");
editButton.addEventListener("click", (event) => {
  editButton.classList.toggle("on");
  document.getElementsByClassName("profile")[0].classList.toggle("small");
});
