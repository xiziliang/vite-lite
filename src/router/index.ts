import { createRouter, createWebHistory, RouteLocationNormalized,type RouteRecordRaw } from 'vue-router';

export const $routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
    },
  },
];

export let $route: RouteLocationNormalized;

export const $router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: $routes,
});

$router.afterEach(to => {
  $route = to;
});