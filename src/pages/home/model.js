import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'home',
  state: {
    page: 1,
    tab: 'all',
    data: [],
    user: {},
    accesstoken: '', // 因为home页面最先加载，因此把用户信息都存在home,其他页面从中提取
    loading: false,
  },
  effects: {
    *init({ payload = {} }, { call, put }) {
      var user = yield AsyncStorage.getItem('user')
      var accesstoken = yield AsyncStorage.getItem('accesstoken')
      if (user) yield put({ type: 'user', payload: JSON.parse(user) })
      if (accesstoken) yield put({ type: 'token', payload: accesstoken })
    },
    *query({ payload = {} }, { call, put }) {
      const { page = 1, tab } = payload
      yield put({ type: 'tab', payload: tab });
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryTopics, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'page', payload: page });
      if (page == 1) yield put({ type: 'query/success', payload: data });
      else yield put({ type: 'more/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseTopics(data.data)
      return { ...state, data: topics };
    },
    'more/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseTopics(data.data)
      return { ...state, data: [...state.data, ...topics] };
    },
    'tab'(state, { payload: data }) {
      return { ...state, tab: data };
    },
    'page'(state, { payload: data }) {
      return { ...state, page: data };
    },
    'user'(state, { payload: data }) {
      return { ...state, user: data };
    },
    'token'(state, { payload: data }) {
      return { ...state, accesstoken: data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
