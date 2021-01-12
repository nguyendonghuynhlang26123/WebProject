SearchButton('btn-search', 'search-input');

let currentActive = 0;
let curPage;
let curMaxPages;
POSTS_PER_PAGE = 4;

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

const searchAndRender = (key, page = 1) => {
  let q = getQuery(key, page);

  fetch(`/post/searchPost/query?${q}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      curMaxPages = data.total_page;
      curPage = 1;

      controller.render(data.posts);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Load next page
const loadNextPage = (key) => {
  let q = getQuery(key, curPage + 1);
  if (curPage >= curMaxPages) return;

  fetch(`/post/searchPost/query?${q}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      curPage++;
      controller.append(data.posts);
    })
    .catch((err) => {
      console.error(err);
    });
};

let getQuery = (key, page) => {
  let query = [];
  query.push(`key=${key}`);
  query.push(`category=${category_id}`);

  query.push(`perPage=${POSTS_PER_PAGE}&page=${page}`);
  return query.join('&');
};

//POST
let controller = new PostListController('post-list');
let category_id = document.querySelector('body').id;
curMaxPages = 1;
curPage = 1;
searchAndRender('');

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
      searchAndRender(ev.target.textContent);
    }
  });

//Observer viewport & render:
document.addEventListener('DOMContentLoaded', () => {
  //set up the IntersectionObserver to load more images if the footer is visible.
  let options = {
    root: null,
    rootMargins: '0px',
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector('#list-end'));
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    loadNextPage(document.querySelector('[data-input-search]').textContent);
  }
}

//Recommendation list
const recommendation = new RecommendationController(
  '[data-recommendation-container]'
);

fetch(`/post/popular?limit=3`)
  .then((data) => data.json())
  .then((data) => {
    recommendation.render(data);
  })
  .catch((err) => {
    console.error(err);
  });

//Subscribe btn
document
  .querySelector('.minimized-header .btn-subscribe')
  .addEventListener('click', (ev) => {
    let check = document.getElementById('modal-toggle').checked;
    document.getElementById('modal-toggle').checked = !check;
    ev.preventDefault();
  });
