function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

class PostListController {
  constructor(apiRoute) {
    this.endPoint = apiRoute;
  }

  createNode = (post) => {
    return createElementFromHTML(`
      <a href=" ${'/post/' + post._id}" class="div post">
      <span class="date">
        ${new Date(post.post_date).toLocaleDateString()} %>
      </span>

      <div>
        <div class="post_detail">
          <h2 class="post_title">
            ${post.post_title}
          </h2>
          <p>
            ${post.post_description}
          </p>
          <span class="date">
            ${`By ${post.post_author.first_name} ${post.post_author.last_name}`}
          </span>
        </div>
        <div class="image">
          <img src="${post.post_thumbnail}" alt="" loading="lazy" />
        </div>
      </div>
      a>
    `);
  };
}

/* 

<a href="" class="div post">
  <span class="date">
  </span>

  <div>
    <div class="post_detail">
      <h2 class="post_title">
      </h2>
      <p>
      </p>
      <span class="date">
      </span>
    </div>
    <div class="image">
    </div>
  </div>
</a>

*/
