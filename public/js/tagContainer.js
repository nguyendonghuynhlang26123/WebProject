const tagContainer = document.querySelector(".tag-container");
const input = document.querySelector(".tag-container input");

let tags = [];
document.querySelectorAll(".tag[tag] span").forEach((e) => {
  tags.push(e.textContent);
});

function createTag(label) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  div.setAttribute("tag", "");
  const span = document.createElement("span");
  span.innerHTML = label;
  const closeIcon = document.createElement("i");
  closeIcon.innerHTML = "&times";
  closeIcon.setAttribute("class", "icons");
  closeIcon.setAttribute("data-item", label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      tagContainer.prepend(createTag(tag));
    });
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.target.value.split(",").forEach((tag) => {
      tags.push(tag);
    });

    addTags();
    input.value = "";
  }
});
document.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const tagLabel = e.target.getAttribute("data-item");
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags();
  }
});

input.focus();
