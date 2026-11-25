new Swiper(".luoghi-swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  a11y: {
    prevSlideMessage: "Fotografia precedente",
    nextSlideMessage: "Fotografia successiva"
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  }
});