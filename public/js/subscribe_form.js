const card = document.querySelector('.card'),
  input = document.querySelector('.input'),
  line2 = document.querySelector('.line2');
document.querySelector('.form').addEventListener('submit', function (e) {
  sendRequest('POST', '/subscribe', { email: input.value })
    .then((res) => {
      input.blur();
      card.classList.add('saving');
    })
    .catch((err) => {
      alert('You have already subscribed with this email');
    });
  e.preventDefault();
});
line2.addEventListener('animationend', function (e) {
  setTimeout(() => {
    card.classList.add('done');
  }, 1000);
});
