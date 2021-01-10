const card = document.querySelector('#subscribe_modal.card'),
  input = document.querySelector('#subscribe_modal .input'),
  line2 = document.querySelector('#subscribe_modal .line2');
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

  setTimeout(() => {
    card.classList.remove('done');
    card.classList.remove('saving');
    input.value = '';
  }, 5000);
});
