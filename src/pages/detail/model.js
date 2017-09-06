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
    defaultReply: { create_at: '刚刚', ups: [], reply_id: null, is_uped: false },
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
      const { data, err } = yield call(service[query], payload);
      if (err) return
      yield put({ type: 'collect/success', payload: collect });
    },
    *ups({ payload = {} }, { call, put }) {
      const { reply_id } = payload
      const { data, err } = yield call(service.ups, payload);
      if (err) return
      yield put({ type: 'ups/success', payload: { reply_id, data } });
    },
    *comment({ payload = {} }, { call, put }) {
      const { user } = payload
      const { data, err } = yield call(service.postComment, payload);
      if (err) return
      yield put({ type: 'comment/success', payload: { data, user } });
    },
    *reply({ payload = {} }, { call, put }) {
      const { reply_id } = payload
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.postComment, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
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
      const is_uped = result.action == "up" ? true : false
      const replies = state.replies.map((reply) => {
        if (reply.id == reply_id) reply.is_uped = is_uped
        return reply
      })
      return { ...state, replies };
    },
    'comment/success'(state, { payload }) {
      const { data, user } = payload
      const [, result] = data
      const { id, loginname, avatar_url } = user
      const reply = { id, content: state.content, author: { loginname, avatar_url }, ...state.defaultReply }
      const replies = state.replies.push(reply)
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
