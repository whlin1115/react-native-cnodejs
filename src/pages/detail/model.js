import * as service from './service';

export default {
  namespace: 'detail',
  state: {
    topic_id: '',
    data: {},
    is_collect: false,
    loading: false,
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data } = yield call(service.queryTopic, payload);
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: data });
    },
    *collect({ payload = {} }, { call, put }) {
      const { collect } = payload
      let query = 'de_collect'
      if (collect) query = 'collect'
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service[query], payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
      yield put({ type: 'collect/success', payload: collect });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseTopic(data.data)
      return { ...state, data: topics, is_collect: topics.is_collect };
    },
    'collect/success'(state, { payload }) {
      return { ...state, is_collect: payload };
    },
    'topic'(state, { payload: data }) {
      return { ...state, topic_id: data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: {}, is_collect: false };
    },
  },
  subscriptions: {},
};
