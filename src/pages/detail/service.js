import { get } from '../../utils/request';
import { moment } from '../../utils/tool';

export async function queryTopic(params) {
  const { id, mdrender = false, accesstoken = null } = params
  return get(`/topic/${id}?mdrender=${mdrender}&accesstoken=${accesstoken}`);
}

export function parseTopic(data) {
  const tabs = { 'top': '置顶', 'ask': '问答', 'good': '精华', 'share': '分享', 'job': '招聘', 'default': '暂无' }
  const create_at = moment(data.create_at).startOf('minute').fromNow()
  const last_reply_at = moment(data.last_reply_at).startOf('minute').fromNow()
  const avatar_url = data.author.avatar_url
  const content = data.content.replace(/[\r\n]/g, '')
  if (!avatar_url.startsWith('https')) data.author.avatar_url = 'https:' + avatar_url
  let tab = data.tab ? data.tab : 'default'
  if (data.top) tab = 'top'
  const sort = tabs[tab]
  const replies = data.replies.map(reply => {
    const create_at = moment(reply.create_at).startOf('minute').fromNow()
    const last_reply_at = moment(reply.last_reply_at).startOf('minute').fromNow()
    const avatar_url = reply.author.avatar_url
    if (!avatar_url.startsWith('https')) reply.author.avatar_url = 'https:' + avatar_url
    const content = reply.content.replace(/[\r\n]/g, '')
    return { ...reply, create_at, last_reply_at, content }
  })
  const topic = { ...data, create_at, last_reply_at, replies, sort, tab, content }
  return topic;
}

export function cacheControl(payload) {
  const { plate } = payload;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const [data] = posts.filter(post => post.plate === plate);
  if (data) return { posts, cache: data.lists };
  else return { posts, cache: null };
}
