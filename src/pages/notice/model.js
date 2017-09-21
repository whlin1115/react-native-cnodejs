import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    messages: [],
    contacts: [],
    chat_history: [],
    register_data: {},
    total_messages: {},
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
      const chat_history = yield AsyncStorage.getItem('chat_history')
      if (chat_history) yield put({ type: 'chat_history', payload: { chat_history: JSON.parse(chat_history) } });
      const total_messages = yield AsyncStorage.getItem('total_messages')
      if (total_messages) yield put({ type: 'total_messages', payload: { total_messages: JSON.parse(total_messages) } });
      if (!webim_user && !webim_accesstoken) yield put({ type: 'attempt_login', payload: user })
      else yield put({ type: 'token_login', payload: { user: webim_user, accesstoken: webim_accesstoken } })
      yield put({ type: 'query', payload: { accesstoken } })
    },
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data, err } = yield call(service.queryNotics, payload);
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
      yield call(service.loginWebim, params);
      yield put({ type: 'home/webim_user', payload: { user, access_token } });
    },
    *token_login({ payload = {} }, { call, put }) {
      const { user: { username }, accesstoken } = payload
      const params = { accessToken: accesstoken, user: username }
      yield call(service.tokenLoginWebim, params);
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
      yield call(service.sendTxtMessage, { to, msg });
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
      const notics = service.parseNotics(data.data)
      return { ...state, data: notics, ...notics };
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
    'total_messages'(state, { payload }) {
      const { total_messages } = payload
      return { ...state, total_messages };
    },
    'chat_history'(state, { payload }) {
      const { chat_history } = payload
      return { ...state, chat_history };
    },
    'save_message'(state, { payload }) {
      const { messages, total_messages, chat_history } = service.parseMessage(state, payload)
      AsyncStorage.setItem('total_messages', JSON.stringify(total_messages))
      AsyncStorage.setItem('chat_history', JSON.stringify(chat_history))
      return { ...state, messages, total_messages, chat_history };
    },
    'fetch_message'(state, { payload }) {
      const { user } = payload
      const messages = state.total_messages[user]
      return { ...state, messages };
    },
    'save_contacts'(state, { payload }) {
      const contacts = payload.map(rost => {
        if (rost.subscription === 'both') {
          rost.avatar = 'https://facebook.github.io/react/img/logo_og.png'
          return rost
        }
      })
      // AsyncStorage.setItem('contacts', JSON.stringify(contacts))
      return { ...state, contacts };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
