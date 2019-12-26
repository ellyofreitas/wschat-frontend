import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import Ws from './config/webSocket';

Vue.config.productionTip = false;

Vue.prototype.$ws = Ws;

const routesPrivates = ['home'];

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.token && true;

  const isPrivate = routesPrivates.find(r => r == to.name) && true;

  if (isPrivate && !isAuthenticated) {
    console.log('dont auth');
    next('/login');
  } else if (!isPrivate && isAuthenticated) {
    console.log('auth');
    next('/');
  }

  next();
});

new Vue({
  // beforeCreate() {
  //   this.$ws
  //     .withJwtToken(

  //     )
  //     .connect();
  // },
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
