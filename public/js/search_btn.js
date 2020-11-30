const SearchButton = (buttonId, inputId) => {
  document.getElementById(buttonId).addEventListener((ev) => {
    ev.preventDefault();
    document.getElementById(inputId).focus();
  });
};
