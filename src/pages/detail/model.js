import * as service from './service';

export default {
  namespace: 'detail',
  state: {
    topic_id: '',
    data: {},
    replies: [],
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
    *ups({ payload = {} }, { call, put }) {
      const { reply_id } = payload
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.ups, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
      yield put({ type: 'ups/success', payload: { reply_id, data } });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseTopic(data.data)
      const { replies } = topics
      return { ...state, data: topics, is_collect: topics.is_collect, replies };
    },
    'collect/success'(state, { payload }) {
      return { ...state, is_collect: payload };
    },
    'ups/success'(state, { payload }) {
      const { reply_id, data } = payload
      const [, result] = data
      const is_uped = result.action == "up" ? true : false
      const replies = state.replies.map((reply) => {
        if (reply.id == reply_id) {
          is_uped ? reply.is_uped = true : reply.is_uped = false
        }
        return reply
      })
      return { ...state, replies };
    },
    'topic'(state, { payload: data }) {
      return { ...state, topic_id: data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: {}, is_collect: false, replies: [] };
    },
  },
  subscriptions: {},
};
