const initBannersSlider = () => {
  const slidesList = document.querySelector('.banners__slides-list');
  const slides = document.querySelectorAll('.banners__slide');
  const paginationButtons = document.querySelectorAll('.banners__pagination-button');

  if (!slidesList || slides.length === 0) {
    return null;
  }

  let currentSlide = 0;
  let gap = '';

  const updateButtonsVisibility = () => {
    slides.forEach((slide, index) => {
      const button = slide.querySelector('.banner__button');
      if (button) {
        if (index === currentSlide) {
          button.dataset.hidden = 'false';
          button.setAttribute('tabindex', '0');
        } else {
          button.dataset.hidden = 'true';
          button.setAttribute('tabindex', '-1');
        }
      }
    });
  };

  const goToSlide = (index) => {
    if (index === currentSlide || index < 0 || index >= slides.length) {
      return slides[currentSlide];
    }

    slides[currentSlide].classList.remove('banners__slide--active');
    slides[currentSlide].classList.remove('animated');

    slides[index].classList.add('banners__slide--active');
    slides[index].classList.add('animated');

    updatePagination(index);
    moveSlideList(index);

    currentSlide = index;
    updateButtonsVisibility();

    return slides[index];
  };

  function updatePagination(index) {
    paginationButtons.forEach((btn) => {
      btn.classList.remove('banners__pagination-button--active');
    });
    if (paginationButtons[index]) {
      paginationButtons[index].classList.add('banners__pagination-button--active');
    }
  }

  updateButtonsVisibility();

  function moveSlideList(index) {
    if (!slides[0]) {
      return;
    }

    if (window.innerWidth >= 1024) {
      gap = 30;
    } else {
      gap = 20;
    }
    const slideWidth = slides[0].offsetWidth;
    const translateX = index * (slideWidth + gap);
    slidesList.style.transform = `translateX(-${translateX}px)`;
    slidesList.style.transition = 'transform 0.5s ease';
  }

  const getCurrentSlide = () => slides[currentSlide];

  const getCurrentSlideIndex = () => currentSlide;

  const initEvents = () => {
    paginationButtons.forEach((button, index) => {
      button.addEventListener('click', () => goToSlide(index));
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        moveSlideList(currentSlide);
      }, 100);
    });
  };

  const init = () => {
    initEvents();

    if (slides.length > 0) {
      goToSlide(0);
    }
  };

  init();

  return {
    goToSlide,
    getCurrentSlide,
    getCurrentSlideIndex
  };
};

export {initBannersSlider};
