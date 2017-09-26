# react-native 实现cnodejs客户端

首页和详情页UI参考 https://github.com/shinygang/Vue-cnodejs

API由 https://cnodejs.org/api 提供

在官方提供的API之外，增加搜索入口和个人资料入口。

# 主要功能

token登录、退出；
查看、发布、编辑主题；
点赞评论、回复主题、收藏主题；
搜索、添加好友、实时聊天；
查看资料、查看收藏的主题、回复的主题；

# 更新

17-9-25： 
集成聊天，实现搜索好友，处理申请，实时聊天；

17-9-26： 
修复安卓搜索框显示不全问题；
修复安卓tabbar的icon不能显示问题；
新增对评论进行回复；
优化FlatList显示逻辑;
修复搜索记录不能及时更新问题；
修复android首页发布话题按钮不显示问题；
修复点赞、收藏图标点击后不显示问题；

# 说明

这个项目之间断断续续花了差不多12天时间，之前有一点react基础，因此做react-native上手就稍微快了。

基本就是一边看文档一边做，不懂的Google，所以这个项目可能有些地方写的不好，有时间想到了改进下项目，但是期间学习到了很多知识。

比较复杂的功能还需要时间学习。

这只是一个练手的项目，希望大家多多交流

# 部分演示

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/chat.gif" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/home.gif" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/search.gif" width="50%" height="50%">

# 部分截图

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/511504842345_.pic_hd.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/521504842419_.pic_hd.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/531504842468_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/541504842490_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/551504842567_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/561504842591_.pic_hd.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/571504842628_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/571504842628_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/581504842670_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/591504844116_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/621504844256_.pic.jpg" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/WX20170925-171924%402x.png" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/WX20170925-171942%402x.png" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/WX20170925-171950%402x.png" width="50%" height="50%">

<img src="https://github.com/linwh1115/react-native-cnodejs/blob/master/src/screenshot/WX20170925-173126%402x.png" width="50%" height="50%">

# 等待修复问题

- [ ] 上拉加载更多数据的时候，在android由于加载数据时间比较久，导致不能点击item，只有等待loading结束后才能正常点击（猜测是FlatList的问题，待观察）。
- [ ] android端，点击主页上的tab，反应慢的问题（Android貌似都会比ios慢半拍 = = ）。
- [ ] 文章图片显示问题，可能需要换个解析html的框架。
- [x] android如果图片设置 position:'absolute'，不能显示问题，比如新建文章按钮。
- [x] android如果图片是点击后才显示的，不显示问题，比如点赞和收藏按钮。

# 待完善的功能

- [ ] 实现扫码登录
- [ ] 首页UI调整区分 首页和招聘板块
- [x] 详情页面内容显示优化
- [x] 添加回复评论
- [ ] 话题发布优化
