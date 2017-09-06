import { get, post } from '../../utils/request';
import { moment } from '../../utils/tool';

export async function queryTopic(params) {
  const { topic_id, mdrender = false, accesstoken = null } = params
  return get(`/topic/${topic_id}?mdrender=${mdrender}&accesstoken=${accesstoken}`);
}

export async function collect(params) {
  const { topic_id, accesstoken } = params
  const body = { accesstoken, topic_id }
  return post('/topic_collect/collect', body);
}

export async function de_collect(params) {
  const { topic_id, accesstoken } = params
  const body = { accesstoken, topic_id }
  return post('/topic_collect/de_collect', body);
}

export async function ups(params) {
  const { reply_id, accesstoken } = params
  const body = { accesstoken }
  return post(`/reply/${reply_id}/ups`, body);
}

export async function postComment(params) {
  const { topic_id, accesstoken, content } = params
  const body = { accesstoken, content }
  return post(`/topic/${topic_id}/replies`, body);
}

export async function postReply(params) {
  const { topic_id, accesstoken, content, reply_id } = params
  const body = { accesstoken, content, reply_id }
  return post(`/topic/${topic_id}/replies`, body);
}

export function parseTopic(data) {
  const tabs = { 'top': '置顶', 'ask': '问答', 'good': '精华', 'share': '分享', 'job': '招聘', 'default': '暂无' }
  const create_at = moment(data.create_at).startOf('minute').fromNow()
  const last_reply_at = moment(data.last_reply_at).startOf('minute').fromNow()
  const avatar_url = data.author.avatar_url
  const content = data.content.replace(/[\r\n]/g, '')
  if (avatar_url && !avatar_url.startsWith('https')) data.author.avatar_url = 'https:' + avatar_url
  let tab = data.tab ? data.tab : 'default'
  if (data.top) tab = 'top'
  const sort = tabs[tab]
  const replies = data.replies.map(reply => {
    const create_at = moment(reply.create_at).startOf('minute').fromNow()
    const last_reply_at = moment(reply.last_reply_at).startOf('minute').fromNow()
    const avatar_url = reply.author.avatar_url
    if (avatar_url && !avatar_url.startsWith('https')) reply.author.avatar_url = 'https:' + avatar_url
    const content = reply.content.replace(/[\r\n]/g, '')
    return { ...reply, create_at, last_reply_at, content }
  })
  const topic = { ...data, create_at, last_reply_at, replies, sort, tab, content }
  return topic;
}

export function parseUps(payload) {
  const { result, state, reply_id } = payload
  const is_uped = result.action == "up" ? true : false
  const replies = state.replies.map((reply) => {
    if (reply.id == reply_id) {
      reply.is_uped = is_uped
      if (is_uped) reply.ups.push(reply_id)
      else reply.ups.pop()
    }
    return reply
  })
  return replies
}

export function parseComment(payload) {
  const { user, state } = payload
  const { loginname, avatar_url } = user
  const { content, replies } = state
  const reply = { id, content, author: { loginname, avatar_url }, create_at: '刚刚', ups: [], reply_id: null, is_uped: false }
  replies.push(reply)
  return replies
}

export function cacheControl(payload) {
  const { plate } = payload;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const [data] = posts.filter(post => post.plate === plate);
  if (data) return { posts, cache: data.lists };
  else return { posts, cache: null };
}
