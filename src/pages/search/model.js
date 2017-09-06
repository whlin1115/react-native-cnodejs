import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'search',
  state: {
    page: 1,
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
      const { page = 1, content } = payload
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'search', payload: { visible: false, content } });
      const { data, err } = yield call(service.querySearch, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'page', payload: page });
      if (page == 1) yield put({ type: 'query/success', payload: { data, content } });
      else yield put({ type: 'more/success', payload: data });
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
      return { ...state, data: topics, content: content };
    },
    'more/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseSearch(data)
      return { ...state, data: [...state.data, ...topics] };
    },
    'page'(state, { payload: data }) {
      return { ...state, page: data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'records'(state, { payload: data }) {
      AsyncStorage.setItem('records', JSON.stringify(data));
      return { ...state, records: data };
    },
    'search'(state, { payload }) {
      const { visible, content } = payload
      return { ...state, visible, content };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: [], content: '', visible: true };
    },
  },
  subscriptions: {},
};
