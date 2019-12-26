import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Register'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home'),
    private: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
