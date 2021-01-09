//GLOBAL
let currentFilter = [];
let sortBy = 'desc';
let curMaxPages;
let curPage;
const POSTS_PER_PAGE = 8;

//Search btn script
SearchButton('btn-search', 'search-input');

//Load more btn

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
  searchAndRender(document.querySelector('[data-input-search]').value);
};

const removeFilter = (id) => {
  currentFilter = currentFilter.filter((f) => f.id !== id);
  displayFilterText();
  searchAndRender(document.querySelector('[data-input-search]').value);
};

const displayFilterText = () => {
  if (currentFilter.length > 0) {
    let txt = currentFilter.map((e) => e.name).join(', ');
    document.getElementById(
      'display-filter'
    ).innerHTML = `<b>Sections</b>: ${txt}`;
  } else document.getElementById('display-filter').innerHTML = '';
};

//Sort by
document
  .querySelector('.select[name="sort-by"]')
  .addEventListener('change', (ev) => {
    if (ev.target.value === 'newest') {
      sortBy = 'desc';
    } else sortBy = 'asc';

    searchAndRender('', 1);
  });

//SEARCH BUTTON
document
  .querySelector('[data-input-search]')
  .addEventListener('keyup', (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      searchAndRender(ev.target.value);
    }
  });

document.querySelector('[data-btn-search]').addEventListener('click', (ev) => {
  ev.preventDefault();
  searchAndRender(document.querySelector('[data-input-search]').value);
});

//FN
//Search and render the first page
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
      setNumPost(data.results);
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
      setNumPost(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
};

let getQuery = (key, page) => {
  let query = [];
  query.push(`key${'=' + key}`);
  let categoryURI =
    currentFilter.length === 0
      ? ''
      : `category=${currentFilter.map((e) => e.id).join('&category=')}`;
  if (categoryURI) query.push(categoryURI);
  if (sortBy) query.push(`order_by=${sortBy}`);

  query.push(`perPage=${POSTS_PER_PAGE}&page=${page}`);
  return query.join('&');
};

//Num posts
const setNumPost = (num) => {
  document.getElementById(
    'num_result'
  ).textContent = `Showing ${num} results for:`;
};

//List post
let controller = new PostListController('post-list');
const input = new URLSearchParams(window.location.search).get('input');
if (input) {
  window.history.pushState({}, '', '/search');
  document.querySelector('[data-input-search]').value = input;
  searchAndRender(input);
} else searchAndRender('');

//Script
displayFilterText();

//Observer viewport & render:
document.addEventListener('DOMContentLoaded', () => {
  //set up the IntersectionObserver to load more images if the footer is visible.
  let options = {
    root: null,
    rootMargins: '0px',
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector('footer'));
});
function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    console.warn('something is intersecting with the viewport');
    loadNextPage(document.querySelector('[data-input-search]').value);
  }
}
