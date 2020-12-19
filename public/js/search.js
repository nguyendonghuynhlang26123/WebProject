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
      addFilter('any', 'any');
      ev.target.checked = true;
    });
  else {
    box.addEventListener('change', (ev) => {
      document.getElementById('any').checked = false;

      if (ev.target.checked)
        addFilter(ev.target.id, ev.target.getAttribute('name'));
      else removeFilter(ev.target.id);
    });
  }
});

//Display chosen filter
const addFilter = (id, filter) => {
  if (filter === 'any') currentFilter = [];
  else currentFilter.push({ id: id, name: filter });
  displayFilterText();
  //TODO: SEND REQUEST
  searchAndRender(document.querySelector('[data-input-search]').value);
};

const removeFilter = (id) => {
  currentFilter = currentFilter.filter((f) => f.id !== id);
  displayFilterText();
  //TODO: SEND REQUEST
  searchAndRender(document.querySelector('[data-input-search]').value);
};

const displayFilterText = () => {
  console.log(currentFilter);
  if (currentFilter.length > 0) {
    let txt = currentFilter.map((e) => e.name).join(', ');
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
      searchAndRender(ev.target.value);
      console.log(ev.target.value);
    }
  });

document.querySelector('[data-btn-search]').addEventListener('click', (ev) => {
  ev.preventDefault();
  searchAndRender(document.querySelector('[data-input-search]').value);
});

//FN
const searchAndRender = (key) => {
  let categoryURI =
    currentFilter.length === 0
      ? ''
      : `category=${currentFilter.map((e) => e.id).join('&category=')}`;
  console.log(
    'log ~ file: search.js ~ line 79 ~ searchAndRender ~ categoryURI',
    categoryURI
  );

  fetch(`/post/search/${key}?${categoryURI}&order_by=${1}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      controller.render(data);
      setNumPost(data.length);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Num posts
const setNumPost = (num) => {
  document.getElementById(
    'num_result'
  ).textContent = `Showing ${num} results for:`;
};

//List post
let controller = new PostListController('post-list');
fetch(`/category/get/international/?limit=10`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    controller.render(data);
    setNumPost(data.length);
  })
  .catch((err) => {
    console.error(err);
  });

//Script
displayFilterText();
