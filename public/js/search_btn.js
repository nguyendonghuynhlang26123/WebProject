const SearchButton = (buttonId, inputId) => {
  document.getElementById(buttonId).addEventListener('click', (ev) => {
    ev.preventDefault();
    document.getElementById(inputId).focus();
  });

  document.getElementById(inputId).addEventListener('keyup', (ev) => {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      console.log('INPUT');
      window.location.href = `/search?input=${ev.target.value}`;
    }
  });
};
