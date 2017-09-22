import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
  namespace: 'notice',
  state: {
    data: [],
    messages: [],               //当前好友聊天内容
    contacts: [],               //联系人列表
    strangers: [],              //好友请求列表
    chat_history: [],           //聊天列表
    register_data: {},          //注册信息
    total_messages: {},         //全部聊天记录
    system_messages: [],        //系统信息
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

      if (Object.keys(user).length == 0) put({ type: 'home/isLogin', payload: false })
      else if (Object.keys(webim_user) == 0 && !webim_accesstoken) yield put({ type: 'attempt_login', payload: user })
      else yield put({ type: 'token_login', payload: { user: webim_user, accesstoken: webim_accesstoken } })

      if (accesstoken) yield put({ type: 'query', payload: { accesstoken } })
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
      const password = `${loginname.toLowerCase()}_password`
      const params = { username: loginname, password }
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
    *add_friends({ payload = {} }, { call, put }) {
      const { username, message = '你好' } = payload;
      yield call(service.addFriends, { username, message });
    },
    *remove_friends({ payload = {} }, { call, put }) {
      const { username } = payload;
      yield call(service.removeFriends, { username });
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
    'effects/fail'(state, { payload }) {
      return { ...state, ...payload };
    },
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
    'change_friends'(state, { payload }) {
      const { contacts } = service.parseFriends(state, payload)
      return { ...state, contacts };
    },
    'on_presence'(state, { payload }) {
      const { contacts, strangers } = service.handlePresence(state, payload)
      // return { ...state, contacts, strangers };
    },
    'total_messages'(state, { payload }) {
      const { total_messages } = payload
      return { ...state, total_messages };
    },
    'chat_history'(state, { payload }) {
      const { chat_history } = payload
      return { ...state, chat_history };
    },
    'delete_sigle_chat'(state, { payload }) {
      const { messages, total_messages, chat_history } = service.parseSigleChat(state, payload)
      AsyncStorage.setItem('total_messages', JSON.stringify(total_messages))
      AsyncStorage.setItem('chat_history', JSON.stringify(chat_history))
      return { ...state, messages, total_messages, chat_history };
    },
    'clean_sigle_history'(state, { payload }) {
      const { messages, total_messages, chat_history } = service.parseSigleHistory(state, payload)
      AsyncStorage.setItem('total_messages', JSON.stringify(total_messages))
      AsyncStorage.setItem('chat_history', JSON.stringify(chat_history))
      return { ...state, messages, total_messages, chat_history };
    },
    'save_message'(state, { payload }) {
      const { messages, total_messages, chat_history } = service.parseMessage(state, payload)
      AsyncStorage.setItem('total_messages', JSON.stringify(total_messages))
      AsyncStorage.setItem('chat_history', JSON.stringify(chat_history))
      return { ...state, messages, total_messages, chat_history };
    },
    'fetch_message'(state, { payload }) {
      const { user: { name } } = payload
      const messages = state.total_messages[name]
      return { ...state, messages };
    },
    'save_contacts'(state, { payload }) {
      const { contacts, strangers } = service.parseRosters(payload)
      return { ...state, contacts, strangers };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
  },
  subscriptions: {},
};
