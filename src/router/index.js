import { createRouter, createWebHashHistory } from 'vue-router';
import MemoryGameView from '@/views/MemoryGameView/MemoryGameView.vue';
import ScoreboardView from '@/views/ScoreboardView/ScoreboardView.vue';

const routes = [
  {
    path: '/game',
    name: 'MemoryGameView',
    component: MemoryGameView,
  },
  {
    path: '/scoreboard',
    name: 'ScoreboardView',
    component: ScoreboardView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
