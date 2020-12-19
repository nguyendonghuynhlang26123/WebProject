//GLOBAL
let currentFilter = [];

//Search btn script
SearchButton('btn-search', 'search-input');

//Section btn
document.querySelector('#sections .select').addEventListener('click', (ev) => {
  let target = ev.target.closest('#sections');
  target.classList.add('active');
  target.focus();
});

window.addEventListener('click', (e) => {
  let container = document.getElementById('sections');
  let target = e.target.closest('#sections');

  if (!target) {
    container.classList.remove('active');
  }
});

//When user click 'any' btn => disable all other checkbox
//When user click other btn => disable 'any'
document.querySelectorAll('input[type="checkbox"]').forEach((box) => {
  if (box.id === 'any')
    box.addEventListener('change', (ev) => {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      addFilter('any');
      ev.target.checked = true;
    });
  else {
    box.addEventListener('change', (ev) => {
      document.getElementById('any').checked = false;
      addFilter(ev.target.id);
    });
  }
});

//Display chosen filter
const addFilter = (filter) => {
  if (filter === 'any') currentFilter = [];
  else currentFilter.push(filter);
  displayFilterText();
  //TODO: SEND REQUEST
};

const displayFilterText = () => {
  console.log(currentFilter);
  if (currentFilter.length > 0) {
    let txt = currentFilter.join(', ');
    document.getElementById(
      'display-filter'
    ).innerHTML = `<b>Sections</b>: ${txt}`;
  } else document.getElementById('display-filter').innerHTML = '';
};

//SEARCH BUTTON
document
  .querySelector('[data-input-search]')
  .addEventListener('keyup', (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      //TODO SEND REQUEST
      console.log(ev.target.value);
    }
  });

document.querySelector('[data-btn-search]').addEventListener('click', (ev) => {
  ev.preventDefault();
  //TODO: SEND REQUEST
  console.log(document.querySelector('[data-input-search]').value);
});

//List post
let controller = new PostListController('post-list');
fetch(`/category/get/international/?limit=10`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('log ~ file: category-page.js ~ line 30 ~ .then ~ data', data);
    if (data.length >= 10) controller.render(data.slice(4));
    else controller.render(data);
  })
  .catch((err) => {
    console.error(err);
  });

//Script
displayFilterText();
