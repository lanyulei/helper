import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { 
      path: '/home', 
      component: () => import('@/views/home/index.vue')
    },
    { 
      path: '/chat', 
      component: () => import('@/views/chat/index.vue')
    },
    { 
      path: '/tools', 
      component: () => import('@/views/tools/index.vue')
    },
    { 
      path: '/tools/password', 
      component: () => import('@/views/tools/password/index.vue')
    },
    { 
      path: '/settings', 
      component: () => import('@/views/settings/index.vue')
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
