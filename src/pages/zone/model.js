import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'zone',
  state: {
    data: {},
    info: {},
    collects: [],
    other_data: {},
    setting: { draft: true, notic: true },
    loading: false,
  },
  effects: {
    *init({ payload = {} }, { select, call, put }) {
      const user = yield select(state => state.home.user);
      const accesstoken = yield select(state => state.home.accesstoken);
      if (user) yield put({ type: 'query', payload: user })
      var setting = yield AsyncStorage.getItem('setting')
      if (setting) yield put({ type: 'config', payload: JSON.parse(setting) })
    },
    *login({ payload = {} }, { call, put }) {
      const { accesstoken } = payload
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.postToken, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'login/success', payload: data });
      yield put({ type: 'home/token', payload: accesstoken });
      const [, user] = data
      yield put({ type: 'query', payload: user });
    },
    *query({ payload = {} }, { call, put }) {
      const { loginname } = payload
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'home/user', payload: payload });
      const { data, err } = yield call(service.queryUser, { user: loginname });
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'query/success', payload: data });
    },
    *otherInfo({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryUser, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'otherInfo/success', payload: data });
    },
    *information({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryInfo, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'information/success', payload: data });
    },
    *collects({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryCollects, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'collects/success', payload: data });
    },
  },
  reducers: {
    'login/success'(state, { payload }) {
      const [, data] = payload
      return { ...state, user: data };
    },
    'query/success'(state, { payload }) {
      const [, result] = payload
      const data = service.parseUser(result.data)
      return { ...state, data };
    },
    'otherInfo/success'(state, { payload }) {
      const [, result] = payload
      const data = service.parseUser(result.data)
      return { ...state, other_data: data };
    },
    'information/success'(state, { payload }) {
      const [, data] = payload
      const info = service.parseInfo(data)
      return { ...state, info };
    },
    'collects/success'(state, { payload }) {
      const [, data] = payload
      const collects = service.parseCollects(data.data)
      return { ...state, collects };
    },
    'de_collect'(state, { payload }) {
      const collects = state.collects.filter(collect => collect.id !== payload);
      return { ...state, collects };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'config'(state, { payload: data = {} }) {
      AsyncStorage.setItem('setting', JSON.stringify(data));
      return { ...state, setting: data };
    },
    'clean'(state, { payload: data }) {
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('accesstoken')
      AsyncStorage.removeItem('webim_user')
      AsyncStorage.removeItem('webim_accesstoken')
      return { ...state, data: {} };
    },
    'cleanInfo'(state) {
      return { ...state, info: {} };
    },
  },
  subscriptions: {},
};
