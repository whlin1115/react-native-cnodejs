import * as service from './service';

export default {
  namespace: 'zone',
  state: {
    data: {},
    loading: false,
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data } = yield call(service.queryUser, payload);
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const user = service.parseUser(data.data)
      return { ...state, data: user };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
