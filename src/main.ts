// import { sharedFunc } from '@vu/shared';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render(props: Record<string, unknown>) {
      const { theme } = props as {
        theme?: { darkMode?: boolean; locale?: string };
      };
      return h(App, { theme });
    },
    serverPort: 4101,
  },
  handleInstance: (app) => {
    app.use(router);
    app.use(PrimeVue, { theme: { preset: Aura } });
  },
});

const mountVue = () => {
  const app = createApp(App, { theme: { darkMode: false, locale: 'mock' } });
  app.use(router);
  app.use(PrimeVue, { theme: { preset: Aura } });
  app.mount('#app');
};

if (import.meta.env.MODE === 'development' && document.getElementById('app')) {
  mountVue();
}

export const bootstrap = async (props: Record<string, unknown>) => {
  console.log('Child Vue App: Bootstrapping');
  await vueLifecycles.bootstrap(props);
};

export const mount = async (props: Record<string, unknown>) => {
  console.log('Child Vue App: Mounting with props:', props);
  // sharedFunc();
  await vueLifecycles.mount(props);
};

export const unmount = async (props: Record<string, unknown>) => {
  console.log('Child Vue App: Cleaning up state stores before unmounting DOM.');
  await vueLifecycles.unmount(props);
};
