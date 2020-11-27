const toggle = document.querySelectorAll(".toggle")[0];
const nav = document.querySelectorAll("nav")[0];
const toggle_open_text = "Menu";
const toggle_close_text = "Close";

toggle.addEventListener(
  "click",
  function () {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
      toggle.innerHTML = toggle_close_text;
    } else {
      toggle.innerHTML = toggle_open_text;
    }
  },
  false
);

setTimeout(function () {
  nav.classList.toggle("open");
}, 800);
