const left_clickable = document.getElementsByClassName("left_clickable");
const right_clickable = document.getElementsByClassName("right_clickable");
const menu = document.getElementById("menu");

const showCtxMenu = (e) => {
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.pageX}px`;
  menu.classList.add("show");

  outClick.style.display = "block";
};

document.addEventListener("contextmenu", (event) => event.preventDefault());

if (menu) {
  const outClick = document.createElement("div");
  outClick.setAttribute("id", "outClick");
  menu.parentElement.appendChild(outClick);
  console.log(left_clickable);

  if (right_clickable) {
    Array.from(right_clickable).forEach((c) => {
      c.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showCtxMenu(e);
      });
    });
  }
  if (left_clickable) {
    Array.from(left_clickable).forEach((c) => {
      c.addEventListener("click", (e) => {
        e.preventDefault();
        showCtxMenu(e);
      });
    });
  }

  outClick.addEventListener("click", () => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      outClick.style.display = "none";
    }
  });
  outClick.addEventListener("contextmenu", () => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      outClick.style.display = "none";
    }
  });
}
