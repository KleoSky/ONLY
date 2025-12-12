const initScrollAnimationListener = () => {
  const scrollSections = document.querySelectorAll('.scroll-section');
  if (scrollSections.length === 0) {
    return null;
  }

  const handleIntersection = (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        entry.target.classList.add('animated');
        observerInstance.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5
  });

  scrollSections.forEach((section) => observer.observe(section));

  return observer;
};

export { initScrollAnimationListener };
