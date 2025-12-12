import { initBannersSlider } from './banners/banners-slider.js';
import { initScrollAnimationListener } from './smooth-scroll.js';

const initTransform = () => {
  const slider = initBannersSlider();
  const observer = initScrollAnimationListener();

  if (slider) {
    const originalGoToSlide = slider.goToSlide;

    slider.goToSlide = function (index) {
      const newSlide = originalGoToSlide.call(this, index);

      if (newSlide && index !== 0) {
        observer.disconnect();
      }

      return newSlide;
    };
  }

  return { slider };
};

export { initTransform };
