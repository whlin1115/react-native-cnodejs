import { requestHtml } from '../../utils/request';
import cheerio from 'cheerio';
var $;

export async function queryHots() {
  return requestHtml('/bbs/all-gambia');
}

export async function query(plate) {
  return requestHtml(`/mbbs/${plate}`);
}

export function parseHots(html) {
  $ = cheerio.load(html);
  var lists = [];
  const datas = $('.bbsHotPit').find('.list li');
  datas.each(function () {
    const id = $(this).find('.textSpan a').attr('href').replace(/\/(\d+)(.*?)$/, "$1");
    const title = $(this).find('.textSpan a').attr('title');
    const like = $(this).find('.textSpan em').text().replace(/(\d+).*?$/, "$1") || 0;
    const reply = $(this).find('.textSpan em').text().replace(/([\d]+).*?([\d]+).*?$/, "$2") || 0;
    const plate = $(this).find('.forum a').text();
    const list = { id, title, like, reply, plate };
    lists.push(list);
  });
  return lists;
}


export function parsePlate(html) {
  $ = cheerio.load(html);
  var lists = [];
  const datas = $('.news-list li');
  datas.each(function () {
    const id = $(this).find('a').attr('href').replace(/.*?(\d+).*?$/, '$1');
    const title = $(this).find('.news-txt h3').text();
    const like = $(this).find('.icon-bright').next().text() || 0;
    const reply = $(this).find('.icon-comment').next().text() || 0;
    const author = $(this).find('.news-source').text();
    const plate = $(this).find('.news-time').text();
    const list = { id, title, like, reply, plate, author };
    lists.push(list);
  });
  return lists;
}

export function cacheControl(payload) {
  const { plate } = payload;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const [data] = posts.filter(post => post.plate === plate);
  if (data) return { posts, cache: data.lists };
  else return { posts, cache: null };
}
