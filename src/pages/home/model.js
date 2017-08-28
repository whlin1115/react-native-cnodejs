import * as service from './service';

export default {
  namespace: 'home',
  state: {
    data: [],
    loading: false,
    plate: 'hots',
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      const { plate } = payload;
      yield put({ type: 'loading', payload: true });
      let result = {};
      if (plate === 'hots') result = yield call(service.queryHots);
      else result = yield call(service.query, plate);
      const { data } = result;
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: { data, plate } });
    },
  },
  reducers: {
    'query/success'(state, { payload: { data, plate } }) {
      let lists = [];
      if (plate === 'hots') lists = service.parseHots(data);
      else lists = service.parsePlate(data);
      const { posts, cache } = service.cacheControl({ plate });
      if (cache) return { ...state, data: cache };
      else posts.push({ plate, lists });
      localStorage.setItem('posts', JSON.stringify(posts));
      return { ...state, data: lists, plate };
    },
    'init'(state) {
      return { ...state, data: [] };
    },
    'cache'(state, { payload: data }) {
      return { ...state, data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
