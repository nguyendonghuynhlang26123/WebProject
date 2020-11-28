document.getElementById("sidenav_trigger").addEventListener("click", (ev) => {
  document.getElementById("sidenav").classList.add("active");
  document.getElementById("sidenav").classList.remove("inactive");
});

document.getElementById("sidenav_bg").addEventListener("click", (ev) => {
  document.getElementById("sidenav").classList.remove("active");
  document.getElementById("sidenav").classList.add("inactive");
});
