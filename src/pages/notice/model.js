import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    register_data: {},
    system_messages: [],
    has_read_messages: [],
    hasnot_read_messages: [],
    loading: false,
  },
  effects: {
    *init({ payload = {} }, { select, call, put }) {
      const accesstoken = yield select(state => state.home.accesstoken);
      const user = yield select(state => state.home.user);
      const webim_user = yield select(state => state.home.webim_user);
      const webim_accesstoken = yield select(state => state.home.webim_accesstoken);
      if (!webim_user && !webim_accesstoken) yield put({ type: 'attempt_login', payload: user })
      else yield put({ type: 'token_login', payload: { user: webim_user, accesstoken: webim_accesstoken } })
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
      yield put({ type: 'pwd_login', payload: { params: payload } });
    },
    *pwd_login({ payload = {} }, { call, put }) {
      const { params, data } = payload
      const [, info] = data
      const { access_token, user } = info
      yield put({ type: 'loading', payload: true });
      yield call(service.loginWebim, params);
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'home/webim_user', payload: { user, access_token } });
    },
    *token_login({ payload = {} }, { call, put }) {
      const { user: { username }, accesstoken } = payload
      const params = { accessToken: accesstoken, user: username }
      yield put({ type: 'loading', payload: true });
      yield call(service.tokenLoginWebim, params);
      yield put({ type: 'loading', payload: false });
    },
    *attempt_login({ payload = {} }, { call, put }) {
      const { loginname } = payload
      const params = { username: loginname, password: `${loginname}_password` }
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.attemptLogin, params);
      yield put({ type: 'loading', payload: false });
      if (err && err.response.status) yield put({ type: 'register', payload: params });
      else yield put({ type: 'pwd_login', payload: { params, data } });
    },
    *send_message({ payload = {} }, { call, put }) {
      const { to, msg } = payload
      yield put({ type: 'loading', payload: true });
      const send = yield call(service.sendTxtMessage, { to, msg });
      yield put({ type: 'loading', payload: false });
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
