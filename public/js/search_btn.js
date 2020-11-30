const SearchButton = (buttonId, inputId) => {
  document.getElementById(buttonId).addEventListener("click", (ev) => {
    ev.preventDefault();
    document.getElementById(inputId).focus();
    console.log("INPUT");
  });
};
