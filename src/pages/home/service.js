import { request } from '../../utils/request';
import { formatDate } from '../../utils/tool';

export async function queryTopics(page = 1, tab = 'all', limit = 20, mdrender = true) {
  return request(`/topics?page=${page}&limit=${limit}&tab=${tab}&mdrender=${mdrender}`);
}

export function parseTopics(data) {
  const topics = data.map(topic => {
    const create_at = formatDate(topic.create_at)
    const last_reply_at = formatDate(topic.last_reply_at)
    const tab = topic.tab ? topic.tab : 'default'
    const title = topic.title.replace(/[\r\n]/g, '')
    return { ...topic, create_at, last_reply_at, tab, title }
  })
  return topics
}