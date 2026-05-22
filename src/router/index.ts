import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import SubPage from '../pages/SubPage.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'root', redirect: '/vue' },
    { path: '/vue', name: 'home', component: HomePage },
    { path: '/vue/sub', name: 'sub', component: SubPage },
  ],
});

export default router;
