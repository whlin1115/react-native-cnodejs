import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'search',
  state: {
    data: [],
    records: [],
    content: '',
    loading: false,
    visible: true,
  },
  effects: {
    *init({ payload = {} }, { call, put }) {
      const data = yield AsyncStorage.getItem('records') || '[]';
      const records = JSON.parse(data)
      yield put({ type: 'records', payload: records });
    },
    *query({ payload = {} }, { call, put }) {
      const { content } = payload
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'content', payload: content });
      const { data } = yield call(service.querySearch, payload);
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: { data, content } });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const { data, content } = payload
      const [, result] = data
      const datas = state.records.filter(history => history !== content);
      if (datas.length > 9) datas.shift();
      datas.unshift(content);
      AsyncStorage.setItem('records', JSON.stringify(datas));
      const topics = service.parseSearch(result)
      return { ...state, data: topics };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'records'(state, { payload: data }) {
      return { ...state, records: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: [], content: '', visible: true };
    },
    'content'(state, { payload: data }) {
      return { ...state, content: data, visible: false };
    },
  },
  subscriptions: {},
};
