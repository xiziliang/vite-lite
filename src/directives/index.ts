import { clickoutside } from './click-outside';
import { tooltip } from './tooltip';
import type { App } from 'vue';

const directives = {
  clickoutside,
  tooltip
}

const install = (app: App) => {
  Object.entries(directives).forEach(([name, component]) => {
    app.directive(name, component);
  });
};

export default {
  install,
};
