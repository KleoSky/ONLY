import { initMenu } from './modules/burger-menu';
import { initProjectsReorganizer } from './modules/projects/projects-reorganizer';
import { initTransform } from './modules/init';
import { initProjectsSlider } from './modules/projects/projects-slider';
import { initVideoScale } from './modules/hero-video';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initVideoScale();
  initTransform();
  initProjectsReorganizer();
  setTimeout(() => {
    initProjectsSlider();
  }, 50);
});
