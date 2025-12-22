import { initMenu } from './modules/burger-menu';
import { initProjectsReorganizer } from './modules/projects/projects-reorganizer';
import { initTransform } from './modules/init';
import { initProjectsSlider } from './modules/projects/projects-slider';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initTransform();
  initProjectsReorganizer();
  setTimeout(() => {
    initProjectsSlider();
  }, 50);
});
