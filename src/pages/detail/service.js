import { request } from '../../utils/request';
import { moment } from '../../utils/tool';

export async function queryTopic(params) {
  const { id, mdrender = true, accesstoken = null } = params
  return request(`/topic/${id}?mdrender=${mdrender}&accesstoken=${accesstoken}`);
}

export function parseTopic(data) {
  const create_at = moment(data.create_at).startOf('minute').fromNow()
  const last_reply_at = moment(data.last_reply_at).startOf('minute').fromNow()
  const avatar_url = data.author.avatar_url
  if (!avatar_url.startsWith('https')) data.author.avatar_url = 'https:' + avatar_url
  const replies = data.replies.map(reply => {
    const create_at = moment(reply.create_at).startOf('minute').fromNow()
    const last_reply_at = moment(reply.last_reply_at).startOf('minute').fromNow()
    const avatar_url = reply.author.avatar_url
    if (!avatar_url.startsWith('https')) reply.author.avatar_url = 'https:' + avatar_url
    return { ...reply, create_at, last_reply_at }
  })
  const topic = { ...data, create_at, last_reply_at, replies }
  return topic;
}

export function cacheControl(payload) {
  const { plate } = payload;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const [data] = posts.filter(post => post.plate === plate);
  if (data) return { posts, cache: data.lists };
  else return { posts, cache: null };
}
