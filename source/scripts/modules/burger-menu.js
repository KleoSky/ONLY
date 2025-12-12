const header = document.querySelector('.header');
const html = document.querySelector('.page');
const burger = header.querySelector('.button-burger');
const menu = header.querySelector('.main-nav__list');

const isMenuOpen = () => menu.classList.contains('main-nav__list--opened');

const closeMenu = () => {
  burger.classList.remove('button-burger--opened');
  burger.classList.add('button-burger--closed');
  menu.classList.remove('main-nav__list--opened');
  html.classList.remove('html-jswork');

  document.removeEventListener('click', handleOutsideClick);
};

const openMenu = () => {
  burger.classList.remove('button-burger--closed');
  burger.classList.add('button-burger--opened');
  menu.classList.add('main-nav__list--opened');
  html.classList.add('html-jswork');

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
    menu.addEventListener('click', handleMenuLinkClick, true);
  }, 10);
};

const toggleMenu = () => {
  if (isMenuOpen()) {
    closeMenu();
    menu.removeEventListener('click', handleMenuLinkClick, true);
  } else {
    openMenu();
  }
};

function handleOutsideClick(e) {
  if (isMenuOpen() &&
    !e.target.closest('.main-nav__list') &&
    !e.target.closest('.button-burger')) {
    closeMenu();
    menu.removeEventListener('click', handleMenuLinkClick, true);
  }
}

function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function handleMenuLinkClick(e) {
  const link = e.target.closest('.main-nav__link');

  if (link && isMenuOpen()) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      e.stopPropagation();

      closeMenu();
      menu.removeEventListener('click', handleMenuLinkClick, true);

      setTimeout(() => {
        smoothScrollTo(href);
      }, 200);

      return false;
    }
  }
}

const initMenu = () => {
  burger.addEventListener('click', toggleMenu);
};

export { initMenu };
