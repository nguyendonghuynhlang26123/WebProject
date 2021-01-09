class RecommendationController {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
  }

  createElement = (post) => {
    return `<a href="/post/${post._id}" class="recommended-post">
    <img src="${post.post_thumbnail}" loading="lazy" alt="" />
    <div class="recommended-post-title">
      <p class="date">${new Date(post.post_date).toLocaleDateString()}</p>
      <p class="a">
        ${post.post_title}
      </p>
    </div>
  </a>`;
  };

  render = (post_list) => {
    this.root.innerHTML = '';
    post_list.forEach((post) => {
      this.root.appendChild(createElement(post));
    });
  };
}
