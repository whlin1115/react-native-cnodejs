import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    accesstoken: '',
    system_messages: [],
    has_read_messages: [],
    hasnot_read_messages: [],
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
      if (err) return console.log(err)
      yield put({ type: 'query/success', payload: data });
    },
    *mark_one({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.mark_oneMessages, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'mark_one/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const messages = service.parseMessages(data.data)
      return { ...state, data: messages, ...messages };
    },
    'mark_one/success'(state, { payload }) {
      const [, data] = payload
      const { hasnot_read_messages, has_read_messages } = service.parseRead(data, state)
      return { ...state, hasnot_read_messages, has_read_messages };
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
