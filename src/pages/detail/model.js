import * as service from './service';

export default {
  namespace: 'detail',
  state: {
    data: {},
    content: '',
    reply_id: '',
    replies: [],
    is_collect: false,
    loading: false,
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryTopic, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'query/success', payload: data });
    },
    *collect({ payload = {} }, { call, put }) {
      const { collect } = payload
      let query = 'de_collect'
      if (collect) query = 'collect'
      const { data, err } = yield call(service[query], payload);
      if (err) return console.log(err)
      yield put({ type: 'collect/success', payload: collect });
    },
    *ups({ payload = {} }, { call, put }) {
      const { reply_id } = payload
      const { data, err } = yield call(service.ups, payload);
      if (err) return console.log(err)
      yield put({ type: 'ups/success', payload: { reply_id, data } });
    },
    *comment({ payload = {} }, { call, put }) {
      const { user } = payload
      const { data, err } = yield call(service.postComment, payload);
      if (err) return console.log(err)
      yield put({ type: 'comment/success', payload: { data, user } });
    },
    *reply({ payload = {} }, { call, put }) {
      const { reply_id } = payload
      const { data, err } = yield call(service.postComment, payload);
      if (err) return console.log(err)
      yield put({ type: 'comment/success', payload: { reply_id, data } });
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
      const params = { result, state, reply_id }
      const replies = service.parseUps(params)
      return { ...state, replies };
    },
    'comment/success'(state, { payload }) {
      const { data, user } = payload
      const [, result] = data
      const params = { user, state }
      const replies = service.parseComment(params)
      return { ...state, replies };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'content'(state, { payload: data }) {
      return { ...state, content: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: {}, is_collect: false, replies: [] };
    },
  },
  subscriptions: {},
};
