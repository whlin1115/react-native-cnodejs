import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    accesstoken: '',
    loading: false,
  },
  effects: {
    *init({ payload = {} }, { call, put }) {
      var accesstoken = yield AsyncStorage.getItem('accesstoken')
      if (accesstoken) yield put({ type: 'token', payload: accesstoken })
      yield put({ type: 'query', payload: { accesstoken } })
    },
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryMessages, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
      yield put({ type: 'query/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const messages = service.parseMessages(data.data)
      return { ...state, data: messages };
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
