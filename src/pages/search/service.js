import { request, requestHtml } from '../../utils/request';
import { moment } from '../../utils/tool';
import cheerio from 'cheerio-without-node-native';

export async function querySearch(params) {
  const { content, page = 1 } = params
  return requestHtml(`https://m.baidu.com/from=844b/s?pn=${page}0&usm=1&word=site%3Acnodejs.org+${content}`)
}

export function parseSearch(data) {
  const $ = cheerio.load(data);
  var lists = [];
  const results = $('#results .c-result')
  results.each(function (i, elem) {
    const dataLog = $(this).attr('data-log').replace(/'/g, '"')
    const id = JSON.parse(dataLog).mu.replace(/.*?topic\/(.*?)$/, '$1')
    const title = $(this).find('h3').text()
    const content = $(this).find('p').text()
    const list = { id, title, content };
    if (id.length == 24) lists.push(list) // 话题ID长度
  });
  return lists;
}