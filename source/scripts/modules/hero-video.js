const video = document.querySelector('.hero__video');
const container = document.querySelector('.hero__wrapper') || document.body;
const videoTopPosition = video.getBoundingClientRect().top + window.scrollY;

const initVideoScale = () => {
  if (window.innerWidth <= 1279 || window.innerWidth >= 2561 || !video) {
    return;
  }

  let isTabPressed = false;
  let tabTimeout = null;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isTabPressed = true;
      clearTimeout(tabTimeout);
      tabTimeout = setTimeout(() => {
        isTabPressed = false;
      }, 3000);
    }
  });

  document.addEventListener('mousedown', () => {
    isTabPressed = false;
    clearTimeout(tabTimeout);
  });

  document.addEventListener('touchstart', () => {
    isTabPressed = false;
    clearTimeout(tabTimeout);
  });

  const CONFIG = {
    PADDING: 60,
    START_PERCENT: 33,
    SCROLL_RANGE: 300,
    ASPECT_RATIO: 456 / 230
  };

  const getContainerWidth = () => {
    const baseWidth = container.offsetWidth;
    return window.innerWidth >= 1920 ? baseWidth - CONFIG.PADDING : baseWidth;
  };

  const setVideoSize = (width) => {
    const height = width / CONFIG.ASPECT_RATIO;
    video.style.width = `${width}px`;
    video.style.height = `${height}px`;
  };

  const init = () => {
    const calculatedContainerWidth = getContainerWidth();
    const startWidth = calculatedContainerWidth * (CONFIG.START_PERCENT / 100);

    setVideoSize(startWidth);
    video.style.position = 'absolute';
    video.style.top = `${videoTopPosition}px`;

    return {
      containerWidth: calculatedContainerWidth, startWidth
    };
  };

  const { containerWidth: initialContainerWidth } = init();
  let containerWidth = initialContainerWidth;
  const startScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    if (isTabPressed) {
      return;
    }

    const scrollDown = Math.max(0, window.scrollY - startScroll);
    const progress = Math.min(1, scrollDown / CONFIG.SCROLL_RANGE);
    const easeProgress = 1 - ((1 - progress) ** 1.5);

    const currentPercent = CONFIG.START_PERCENT +
      (100 - CONFIG.START_PERCENT) * easeProgress;

    const currentWidth = containerWidth * (currentPercent / 100);
    setVideoSize(currentWidth);
  }, { passive: true });

  window.addEventListener('resize', () => {
    const currentWidth = parseFloat(video.style.width);
    const newContainerWidth = getContainerWidth();
    const currentPercent = (currentWidth / containerWidth) * 100;
    const newWidth = newContainerWidth * (currentPercent / 100);

    setVideoSize(newWidth);
    containerWidth = newContainerWidth;
  }, { passive: true });
};

export { initVideoScale };

