import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { 
      path: '/home', 
      component: () => import('@/views/home/index.vue')
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
