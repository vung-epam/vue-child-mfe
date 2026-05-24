import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import './style.css';

const lifecycle = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
  },
});

export const mount = lifecycle.mount;
export const unmount = lifecycle.unmount;
export const bootstrap = lifecycle.bootstrap;
