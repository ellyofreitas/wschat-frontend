import 'babel-polyfill';
import Ws from '@adonisjs/websocket-client';
import store from '@/store';

const ws = Ws('ws://127.0.0.1:3333');

ws.on('open', () => {
  store.commit('setSocketConnectionStatus', true);
});

ws.on('close', () => store.commit('setSocketConnectionStatus', false));
ws.on('error', () => store.commit('setSocketConnectionStatus', false));

export default ws;
