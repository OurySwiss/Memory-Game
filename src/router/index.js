import { createRouter, createWebHashHistory } from 'vue-router';
import MemoryGameView from '@/views/MemoryGameView.vue';

const routes = [
  {
    path: '/',
    name: 'MemoryGameView',
    component: MemoryGameView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
