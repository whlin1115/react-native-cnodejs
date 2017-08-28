import * as service from './service';

export default {
  namespace: 'home',
  state: {
    data: [],
    loading: false,
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      const { plate } = payload;
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: { data } });
    },
  },
  reducers: {
    'query/success'(state, { payload: { data } }) {
      let lists = [];
      return { ...state, data: lists };
    },
  },
  subscriptions: {},
};
