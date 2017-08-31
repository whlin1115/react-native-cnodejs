import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formatDate = function (str) {
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

const city = {
  'one': ['北京市', '上海市', '广州市', '深圳市'],
  'new': ['成都市', '杭州市', '武汉市', '重庆市', '南京市', '天津市', '苏州市', '西安市', '长沙市', '沈阳市', '青岛市', '郑州市', '大连市', '东莞市', '宁波市'],
  'two': ['厦门市', '福州市', '无锡市', '合肥市', '昆明市', '哈尔滨市', '济南市', '佛山市', '长春市', '温州市', '石家庄市', '南宁市', '常州市', '泉州市', '南昌市', '贵阳市', '太原市', '烟台市', '嘉兴市', '南通市', '金华市', '珠海市', '惠州市', '徐州市', '海口市', '乌鲁木齐市', '绍兴市', '中山市', '台州市', '兰州市'],
}

export { formatDate, moment, city }