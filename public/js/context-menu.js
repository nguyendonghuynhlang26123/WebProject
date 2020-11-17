const clickable = document.getElementById("clickable");
const menu = document.getElementById("menu");
const outClick = document.getElementById("out-click");

clickable.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.classList.add("show");

  outClick.style.display = "block";
});

outClick.addEventListener("click", () => {
  menu.classList.remove("show");
  outClick.style.display = "none";
});
