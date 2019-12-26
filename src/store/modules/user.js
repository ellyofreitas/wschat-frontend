import router from '@/router';
import api from '@/services/api';

const state = {
  username: '',
};

const getters = {};

const actions = {
  async register({ commit }, payload) {
    const { data } = await api.post('/users', payload);

    if (data) {
      commit('REGISTER_SUCCESS');
    }
  },
};

const mutations = {
  SET_USER(state, payload) {
    console.log(payload);
    state.username = payload;
  },
  REGISTER_SUCCESS() {
    router.push('/login');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
