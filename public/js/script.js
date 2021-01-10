window.addEventListener('load', () => {
  new Glider(document.querySelector('.glider1'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next',
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3,
          slidesToScroll: 'auto',
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 'auto',
          itemWidth: 400,
          duration: 0.25,
        },
      },
    ],
  });
});

/** SEARCH BUTTON ---------------------------*/
SearchButton('btn-search', 'search-input');

//Subscribe modal
document
  .querySelector('[data-nav-subscribe]')
  .addEventListener('click', (ev) => {
    let check = document.getElementById('modal-toggle').checked;
    document.getElementById('modal-toggle').checked = !check;
  });

//Subscribe btns
document
  .querySelector('[data-side-email] ~ button')
  .addEventListener('click', (ev) => {
    ev.preventDefault();
    document.querySelector(
      '#subscribe_modal .input'
    ).value = document.querySelector('[data-side-email]').value;

    document.querySelector('[data-nav-subscribe]').click();
  });

document
  .querySelector('[data-footer-email] ~ button')
  .addEventListener('click', (ev) => {
    ev.preventDefault();
    document.querySelector(
      '#subscribe_modal .input'
    ).value = document.querySelector('[data-footer-email]').value;

    document.querySelector('[data-nav-subscribe]').click();
  });
