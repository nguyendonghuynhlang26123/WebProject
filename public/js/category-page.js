SearchButton('btn-search', 'search-input');

let currentActive = 0;

const setActive = (index) => {
  document.querySelectorAll('.tab_list .tab').forEach((element, i) => {
    if (i === index) element.classList.add('active');
    else element.classList.remove('active');
  });
};

setActive(currentActive);

document.querySelectorAll('.tab_list .tab').forEach((element, i) => {
  element.addEventListener('click', (ev) => {
    ev.preventDefault();

    setActive(i);
  });
});
