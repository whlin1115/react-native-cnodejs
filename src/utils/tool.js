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
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};

export const phone = (function () {
  var ua = navigator.platform;
  if (ua == 'Android' || ua == 'iPhone' || ua == 'ipad') return true;
  else return false;
})();


export function parsePlate(plate) {
  var color = "plate "
  switch (plate) {
    case "步行街主干道":
      color += "C4F8FF5";
      break;
    case "影视区":
      color += "C4D86EE";
      break;
    case "爆照区":
      color += "CE16C40";
      break;
    case "英雄联盟":
      color += "CF8B841";
      break;
    case "王者荣耀":
      color += "C2DB98B";
      break;
    case "IT数码区":
      color += "C1C81F0";
      break;
    default:
      color += "C4F8FF5";
      break;
  }
  return color;
}