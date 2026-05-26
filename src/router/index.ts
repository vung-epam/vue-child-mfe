import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'root', redirect: '/vue' },
    {
      path: '/vue',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },

    {
      path: '/vue/users',
      name: 'users',
      component: () => import('../pages/UsersPage.vue'),
    },
  ],
});

export default router;
