const initProjectsSlider = () => {
  const initSliders = () => {
    document.querySelectorAll('.projects__gallery-slider:not(.projects__gallery-slider--notmobile)').forEach((slider) => {
      const slides = slider.querySelectorAll('.projects__gallery-slide');

      if (slides.length > 1 && slider.scrollWidth > slider.clientWidth) {
        slider.style.overflowX = 'auto';
        slider.style.scrollBehavior = 'smooth';

        let startX = 0;

        slider.ontouchstart = (e) => {
          startX = e.touches[0].clientX;
        };

        slider.ontouchend = (e) => {
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;

          if (Math.abs(diff) > 50) {
            slider.scrollLeft += diff > 0 ? 325 : -325;
          }
        };
      }
    });
  };

  initSliders();
  window.addEventListener('resize', initSliders);
};

export { initProjectsSlider };
