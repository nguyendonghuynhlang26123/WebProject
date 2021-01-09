function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}
class RecommendationController {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  createElement = (post) => {
    return createElementFromHTML(`<a href="/post/${
      post._id
    }" class="recommended-post">
    <img src="${post.post_thumbnail}" loading="lazy" alt="" />
    <div class="recommended-post-title">
      <p class="date">${new Date(post.post_date).toLocaleDateString()}</p>
      <p class="a">
        ${post.post_title}
      </p>
    </div>
  </a>`);
  };

  render = (post_list) => {
    const root = document.querySelector(this.rootSelector);
    root.innerHTML = '';
    post_list.forEach((post) => {
      root.appendChild(this.createElement(post));
    });
  };
}
