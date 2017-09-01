import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'zone',
  state: {
    user: {},
    data: {},
    loading: false,
  },
  effects: {
    *login({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const token = yield call(service.postToken, payload);
      yield put({ type: 'login/success', payload: token.data });
      const [, user] = token.data
      const info = yield call(service.queryUser, { user: user.loginname });
      yield put({ type: 'query/success', payload: info.data });
      yield put({ type: 'loading', payload: false });
    },
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'user', payload: payload });
      const { data } = yield call(service.queryUser, { user: payload.loginname });
      yield put({ type: 'query/success', payload: data });
      yield put({ type: 'loading', payload: false });
    },
  },
  reducers: {
    'login/success'(state, { payload }) {
      const [, data] = payload
      AsyncStorage.setItem('user', JSON.stringify(data));
      return { ...state, user: data };
    },
    'query/success'(state, { payload }) {
      const [, data] = payload
      const info = service.parseUser(data.data)
      return { ...state, data: info };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'user'(state, { payload: data }) {
      return { ...state, user: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: {} };
    },
  },
  subscriptions: {},
};
