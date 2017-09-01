import { get, post } from '../../utils/request';
import { moment } from '../../utils/tool';

export async function queryUser(params) {
  const { user } = params
  return get(`/user/${user}`);
}

export async function postToken(params) {
  return post('/accesstoken', params);
}

export function parseUser(data) {
  const create_at = moment(data.create_at).startOf('minute').fromNow()
  const recent_topics = data.recent_topics.map(topic => {
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    return { ...topic, last_reply_at }
  })
  const recent_replies = data.recent_replies.map(topic => {
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    return { ...topic, last_reply_at }
  })
  const user = { ...data, create_at, recent_topics, recent_replies }
  return user
}