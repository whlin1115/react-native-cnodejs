import { get, post } from '../../utils/request';
import WebIM from '../../utils/webIM';
import { moment } from '../../utils/tool';

export async function queryMessages(params) {
  const { accesstoken, mdrender = false } = params
  return get(`/messages?accesstoken=${accesstoken}&mdrender=${mdrender}`);
}

export async function register(params) {
  const { username = 'username3', password = 'password3', nickname } = params
  const body = { username, password, nickname: nickname || username }
  return WebIM.api.register(body);
}

export async function attemptLogin(params) {
  const { username, password } = params
  const body = { username, password, grant_type: 'password', timestamp: +new Date() }
  return WebIM.api.login(body);
}

export async function loginWebim(params) {
  const { apiURL, appkey } = WebIM.config
  const { user = 'username1', pwd = 'password1' } = params
  var options = { apiUrl: apiURL, user, pwd, appKey: appkey };
  WebIM.conn.open(options);
}

export async function sendMessage(params) {
  const { msg = 'message content', to = 'username1', chatType = 'singleChat', roomType = false } = params
  var id = WebIM.conn.getUniqueId();
  var message = new WebIM.message('txt', id);
  const success = (id, serverMsgId) => console.log('=== send message success ===')
  const fail = (e) => console.log(`=== Send message error: ${e} ===`)
  message.set({ msg, to, roomType, success, fail });
  message.body.chatType = chatType;
  WebIM.conn.send(message.body);
}

export async function mark_oneMessages(params) {
  const { accesstoken, msg_id } = params
  const body = { accesstoken }
  return post(`/message/mark_one/${msg_id}`, body);
}

export function parseMessages(data) {
  const has_read_messages = data.has_read_messages.map(message => {
    const last_reply_at = message.topic.last_reply_at
    const create_at = message.reply.create_at
    message.topic.last_reply_at = moment(last_reply_at).startOf('minute').fromNow()
    message.reply.create_at = moment(create_at).startOf('minute').fromNow()
    return message
  })
  const hasnot_read_messages = data.hasnot_read_messages.map(message => {
    const last_reply_at = message.topic.last_reply_at
    const create_at = message.reply.create_at
    message.topic.last_reply_at = moment(last_reply_at).startOf('minute').fromNow()
    message.reply.create_at = moment(create_at).startOf('minute').fromNow()
    return message
  })
  return { has_read_messages, hasnot_read_messages }
}

export function parseRead(data, state) {
  const { marked_msg_id } = data
  const hasnot_read_messages = state.hasnot_read_messages.filter(messages => messages.id !== marked_msg_id);
  const read_messages = state.hasnot_read_messages.map((messages) => {
    if (messages.id === marked_msg_id) {
      messages.has_read = true
      return messages
    }
  });
  const has_read_messages = state.has_read_messages.unshift(read_messages[0]).concat()
  return { has_read_messages, hasnot_read_messages }
}