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

//POST
let controller = new PostListController('post-list');
let slug = window.location.pathname.split('/')[2];
fetch(`/category/get/${slug}/?limit=10`)
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

//BTNS events
document
  .querySelector('[data-clear-search]')
  .addEventListener('click', (ev) => {
    document.querySelector('[data-input-search]').textContent = '';
  });

document
  .querySelector('[data-input-search]')
  .addEventListener('keypress', (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      //TODO SEND REQUEST
      console.log(ev.target.textContent);
    }
  });
