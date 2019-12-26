import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from '@/store/modules/auth';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socketConnected: false,
  },
  mutations: {
    setSocketConnectionStatus(state, payload) {
      state.socketConnected = payload;
    },
  },
  modules: {
    auth,
    user,
  },
  plugins: [createPersistedState()],
});
