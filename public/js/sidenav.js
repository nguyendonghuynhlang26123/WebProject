document.getElementById("sidenav_trigger").addEventListener("click", (ev) => {
  document.getElementById("sidenav").classList.add("active");
  document.getElementById("sidenav").classList.remove("inactive");
});

document.getElementById("sidenav_bg").addEventListener("click", (ev) => {
  document.getElementById("sidenav").classList.remove("active");
  document.getElementById("sidenav").classList.add("inactive");
});

if (document.getElementById("functional-nav") !== null) {
  let prevScrollpos = window.pageYOffset;
  document.getElementById("functional-nav").style = "position: sticky";
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("functional-nav").style.top = "0";
    } else {
      document.getElementById("functional-nav").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };
}
