import { get, post, requestHtml } from '../../utils/request';
import WebIM from '../../utils/webIM';
import { moment } from '../../utils/tool';
import cheerio from 'cheerio-without-node-native';

export async function queryUser(params) {
  const { user } = params
  return get(`/user/${user}`);
}

export async function queryInfo(params) {
  const { user } = params
  return requestHtml(`https://cnodejs.org/user/${user}`);
}

export async function getInfo(params) {
  const { user } = params
  const headers = { Cookie: `CNZZDATA1254020586=461688907-1503624954-https%253A%252F%252Fcnodejs.org%252F%7C1503887769; node_club=s%3A${user.id}%24%24%24%24.WFlKofPUPDLQuxA3BsCw66%2BtcGNqrUXgRCZ8s61yObc;` }
  return requestHtml('https://cnodejs.org/setting', headers);
}

export async function postToken(params) {
  return post('/accesstoken', params);
}

export async function queryCollects(params) {
  const { user } = params
  return get(`/topic_collect/${user}`);
}

export async function logout() {
  WebIM.conn.close();
}

export function parseUser(data) {
  const create_at = moment(data.create_at).startOf('minute').fromNow()
  let avatar_url = data.avatar_url
  if (avatar_url && !avatar_url.startsWith('https')) avatar_url = 'https:' + avatar_url
  const recent_topics = data.recent_topics.map(topic => {
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    return { ...topic, last_reply_at }
  })
  const recent_replies = data.recent_replies.map(topic => {
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    return { ...topic, last_reply_at }
  })
  const user = { ...data, avatar_url, create_at, recent_topics, recent_replies }
  return user
}

export function parseInfo(data) {
  const $ = cheerio.load(data);
  let avatar_url = $('.user_big_avatar img').attr('src')
  if (avatar_url && !avatar_url.startsWith('https')) avatar_url = 'https:' + avatar_url
  const name = $('.user_big_avatar img').attr('title')
  const home = $('.unstyled .fa-home').next().text()
  const location = $('.unstyled .fa-map-marker').next().text()
  const weibo = $('.unstyled .fa-twitter').next().text()
  const signature = $('.user_card .signature').text().replace(/[\r\n\s“”]/g, '')
  return { home, location, weibo, name, avatar_url, signature };
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
  let avatar_url = $('.user_avatar img').attr('src')
  if (avatar_url && !avatar_url.startsWith('https')) avatar_url = 'https:' + avatar_url
  return { ...info, avatar_url };
}

export function parseCollects(data) {
  const tabs = { 'top': '置顶', 'ask': '问答', 'good': '精华', 'share': '分享', 'job': '招聘', 'default': '暂无' }
  const topics = data.map(topic => {
    const create_at = moment(topic.create_at).startOf('minute').fromNow()
    const last_reply_at = moment(topic.last_reply_at).startOf('minute').fromNow()
    const avatar_url = topic.author.avatar_url
    if (avatar_url && !avatar_url.startsWith('https')) topic.author.avatar_url = 'https:' + avatar_url
    let tab = topic.tab ? topic.tab : 'default'
    if (topic.top) tab = 'top'
    const sort = tabs[tab]
    const title = topic.title.replace(/[\r\n]/g, '')
    return { ...topic, create_at, last_reply_at, tab, title, sort }
  })
  return topics
}