import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    webim_data: {},
    system_messages: [],
    has_read_messages: [],
    hasnot_read_messages: [],
    loading: false,
  },
  effects: {
    *init({ payload = {} }, { select, call, put }) {
      const accesstoken = yield select(state => state.home.accesstoken);
      const user = yield select(state => state.home.user);
      yield put({ type: 'attempt_login', payload: user })
      yield put({ type: 'query', payload: { accesstoken } })
    },
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryMessages, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'query/success', payload: data });
    },
    *register({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.register, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'register/success', payload: data });
    },
    *login({ payload = {} }, { call, put }) {
      const data = yield call(service.loginWebim, payload);
    },
    *attempt_login({ payload = {} }, { call, put }) {
      const { loginname } = payload
      const params = { username: loginname, password: `${loginname}_password` }
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.attemptLogin, params);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'attempt_login/success', payload: data });
    },
    *send_message({ payload = {} }, { select, call, put }) {
      yield put({ type: 'loading', payload: true });
      const accesstoken = yield select(state => state.zone.accesstoken);
      const send = yield call(service.sendMessage, payload);
    },
    *mark_one({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.mark_oneMessages, payload);
      yield put({ type: 'loading', payload: false });
      if (err) return console.log(err)
      yield put({ type: 'mark_one/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const messages = service.parseMessages(data.data)
      return { ...state, data: messages, ...messages };
    },
    'register/success'(state, { payload }) {
      const [, data] = payload
      const { entities: [chat] } = data
      return { ...state, register_data: chat };
    },
    'attempt_login/success'(state, { payload }) {
      const [, data] = payload
      return { ...state, webim_data: data };
    },
    'mark_one/success'(state, { payload }) {
      const [, data] = payload
      const { hasnot_read_messages, has_read_messages } = service.parseRead(data, state)
      return { ...state, hasnot_read_messages, has_read_messages };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
