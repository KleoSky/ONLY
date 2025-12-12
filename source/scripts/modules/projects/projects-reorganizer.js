const categoriesContainer = document.querySelector('.projects__gallery-categories');
const notMobileContainer = document.querySelector('.projects__gallery-slider--notmobile');
const allSlides = document.querySelectorAll('.projects__gallery-slide');
let currentMode = null;
let isProcessing = false;

const reorganizeProjects = () => {
  if (isProcessing) {
    return;
  }

  isProcessing = true;

  try {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const isNotMobile = mediaQuery.matches;
    const newMode = isNotMobile ? 'notMobile' : 'mobile';

    if (newMode === currentMode) {
      isProcessing = false;
      return;
    }

    if (isNotMobile) {
      notMobileContainer.innerHTML = '';

      allSlides.forEach((slide, index) => {
        const clone = slide.cloneNode(true);
        clone.dataset.cloneOf = `${slide.dataset.category}-${+ index}`;
        notMobileContainer.appendChild(clone);
      });

      categoriesContainer.hidden = true;
      notMobileContainer.hidden = false;

    } else {
      notMobileContainer.innerHTML = '';
      categoriesContainer.hidden = false;
      notMobileContainer.hidden = true;
    }

    currentMode = newMode;

  } finally {
    isProcessing = false;
  }
};

export const initProjectsReorganizer = () => {
  reorganizeProjects();

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const handleMediaChange = () => {
    reorganizeProjects();
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      reorganizeProjects();
    }, 150);
  });
};
