import { get, post, requestHtml } from '../../utils/request';
import { moment } from '../../utils/tool';
import cheerio from 'cheerio-without-node-native';

export async function queryUser(params) {
  const { user } = params
  return get(`/user/${user}`);
}

export async function getInfo(params) {
  const { user } = params
  const headers = { Cookie: `CNZZDATA1254020586=461688907-1503624954-https%253A%252F%252Fcnodejs.org%252F%7C1503887769; node_club=s%3A${user.id}%24%24%24%24.WFlKofPUPDLQuxA3BsCw66%2BtcGNqrUXgRCZ8s61yObc;` }
  return requestHtml('https://cnodejs.org/setting', headers);
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

export function parseInformation(data) {
  const $ = cheerio.load(data);
  const controls = $('#setting_form .controls')
  const info = {};
  controls.each(function (i, elem) {
    const key = $(this).children().first().attr('id')
    const valueEle = $(this).children().first()
    const value = valueEle.attr('value') || valueEle.text()
    info[key] = value
  })
  const avatar_url = $('.user_avatar img').attr('src')
  return { ...info, avatar_url };
}