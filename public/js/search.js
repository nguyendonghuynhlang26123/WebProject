//Sections

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
