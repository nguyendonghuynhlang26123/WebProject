window.addEventListener("load", () => {
  document.querySelectorAll(".glider").forEach((e) => {
    new Glider(e, {
      // Mobile-first defaults
      slidesToShow: 1,
      slidesToScroll: 1,
      scrollLock: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 3,
            slidesToScroll: "auto",
          },
        },
        {
          // screens greater than >= 1024px
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: "auto",
            itemWidth: 400,
            duration: 0.25,
          },
        },
      ],
    });
  });
});
