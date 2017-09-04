import { get } from '../../utils/request';
import { moment, city } from '../../utils/tool';

export async function queryTopics(params) {
  const { page = 1, tab = 'job', limit = 20, mdrender = true } = params
  return get(`/topics?page=${page}&limit=${limit}&tab=${tab}&mdrender=${mdrender}`);
}

export function parseTopics(data) {
  const topics = data.map(topic => {
    const create_at = moment(topic.create_at).startOf('minute').fromNow()
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    const avatar_url = topic.author.avatar_url
    if (!avatar_url.startsWith('https')) topic.author.avatar_url = 'https:' + avatar_url
    const title = topic.title.replace(/[\r\n]/g, '')
    const location = title.match(/[\u4E00-\u9FA5]{2}/)
    let sort = '暂无'
    if (location) sort = location[0]
    var tab = 'default'
    for (var l in city) {
      var line = String(city[l])
      if (line.indexOf(sort) > -1) {
        var tab = l
        break
      }
    }
    return { ...topic, create_at, last_reply_at, tab, title, sort }
  })
  return topics
}