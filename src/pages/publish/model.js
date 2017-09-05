import * as service from './service';

export default {
  namespace: 'publish',
  state: {
    topic_id: '',
    tab: 'dev',
    data: {},
    title: '',
    content: '',
    loading: false,
  },
  effects: {
    *create({ payload = {} }, { call, put }) {
      const { content, title, tab, accesstoken } = payload
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.createTopic, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
      yield put({ type: 'create/success', payload: data });
    },
    *update({ payload = {} }, { call, put }) {
      const { content, title, tab, accesstoken, topic_id } = payload
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.updateTopic, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return
      yield put({ type: 'update/success', payload: data });
    },
  },
  reducers: {
    'create/success'(state, { payload }) {
      const [, data] = payload
      const { topic_id } = data
      return { ...state, topic_id };
    },
    'update/success'(state, { payload }) {
      const [, data] = payload
      const { topic_id } = data
      return { ...state, topic_id };
    },
    'tab'(state, { payload: data }) {
      return { ...state, tab: data };
    },
    'title'(state, { payload: data }) {
      return { ...state, title: data };
    },
    'content'(state, { payload: data }) {
      return { ...state, content: data };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, topic_id: '' };
    },
  },
  subscriptions: {},
};
