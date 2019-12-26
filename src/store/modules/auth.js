import router from '@/router';
import api from '@/services/api';

const state = {
  token: null,
};

const getters = {
  isAuthenticated(state) {
    return state.token && true;
  },
};

const actions = {
  async authenticate({ commit }, payload) {
    const { email, password } = payload;
    console.log(email, password);
    const { data } = await api.post('/sessions', {
      email,
      password,
    });

    if (data) {
      commit('SET_TOKEN', data.token);
      commit('user/SET_USER', data.username, { root: true });
    }
  },
  logout({ commit }) {
    commit('REMOVE_TOKEN');
  },
};

const mutations = {
  SET_TOKEN(state, payload) {
    const { token } = payload;
    console.log(payload);
    state.token = token;
    router.push('/');
  },
  REMOVE_TOKEN(state) {
    state.token = null;
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
