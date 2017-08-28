export const formatDate = function (str) {
  const date = new Date(str);
  const time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return '刚刚';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '个月前';
  } else {
    let year = parseInt(time / 31536000000)
    year = year ? year : 1
    return year + '年前';
  }
};