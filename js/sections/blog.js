$('.blog_owlCarousel').owlCarousel({
  loop: true,
  margin: 10,
  smartSpeed: 800,
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      item: 3
    }
  }
});
