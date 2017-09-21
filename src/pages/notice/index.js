import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import WebIM from '../../utils/webIM';
import { Tip } from '../../components';
import Message from './components/Message';
import ChatRow from './components/ChatRow';
import { StyleSheet, View, ScrollView, RefreshControl, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Notice extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: '消息',
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Contact') }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/recruit.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      ),
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={styles.iconBtn}
          source={!focused ? require('../../assets/images/notic_0.png') : require('../../assets/images/notic_1.png')} />
      ),
      tabBarLabel: '通知',
    };
  };

  componentDidMount() {
    this.props.init()
    WebIM.conn.listen({
      onOpened: (message) => {      //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();  
        WebIM.conn.getRoster({ success: (roster) => this.props.save_contacts(roster) });
        console.log(`=== onOpened ===`)
      },
      onTextMessage: (message) => this._onReceive(message),                           //收到文本消息
      onEmojiMessage: (message) => { console.log(`=== onEmojiMessage ===`) },         //收到表情消息
      onPictureMessage: (message) => { console.log(`=== onPictureMessage ===`) },     //收到图片消息
      onCmdMessage: (message) => { console.log(`=== onCmdMessage ===`) },             //收到命令消息
      onAudioMessage: (message) => { console.log(`=== onAudioMessage ===`) },         //收到音频消息
      onLocationMessage: (message) => { console.log(`=== onLocationMessage ===`) },   //收到位置消息
      onFileMessage: (message) => { console.log(`=== onFileMessage ===`) },           //收到文件消息
      onPresence: (message) => { console.log(`=== onPresence ===`) },                 //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onReceivedMessage: (message) => { console.log(`=== onReceivedMessage ===`) },   //收到消息送达客户端回执
      onDeliveredMessage: (message) => { console.log(`=== onDeliveredMessage ===`) }, //收到消息送达服务器回执
      onReadMessage: (message) => { console.log(`=== onReadMessage ===`) },           //收到消息已读回执
      onMutedMessage: (message) => { console.log(`=== onMutedMessage ===`) },         //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员

      onClosed: (message) => { console.log(`=== onClosed ===`) },                     //连接关闭回调
      onPresence: (message) => { console.log(`=== onPresence ===`) },                 //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: (message) => { console.log(`=== onRoster ===`) },                     //处理好友申请
      onInviteMessage: (message) => { console.log(`=== onInviteMessage ===`) },       //处理群组邀请
      onOnline: () => { console.log(`=== onOnline... ===`) },                         //本机网络连接成功
      onOffline: () => { console.log(`=== onOffline... ===`) },                       //本机网络掉线
      onError: (message) => { console.log(`=== onError ===`) },                       //失败回调
      onBlacklistUpdate: (list) => { console.log(`=== onBlacklistUpdate ===`); },     // 黑名单变动查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
      onCreateGroup: (message) => { console.log(`=== onCreateGroup ===`) },           //创建群组成功回执（需调用createGroupNew）
    });
  }

  _onReceive = (messages) => {
    const name = messages.from;
    const message = {
      _id: Math.round(Math.random() * 1000000),
      text: messages.data,
      createdAt: new Date(),
      user: {
        _id: name,
        name: name,
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
    }
    this.props.saveMessage({ user: { name }, message })
  }

  render() {
    const { data, chat_history, has_read_messages, hasnot_read_messages, accesstoken, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => { this.props.query({ accesstoken }) }} refreshing={loading} />}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('System') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/notice.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>系统消息</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Chat', { user: 'username3' }) }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/comment.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>聊天通知</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          chat_history.length > 0 ?
            <View style={styles.rowList}>
              <FlatList
                style={{ width: width }}
                data={chat_history}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (<ChatRow navigate={navigate} item={item} />)}
              />
            </View>
            : <Tip message={{ text: '暂无聊天' }} />
        }
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { data, chat_history, has_read_messages, hasnot_read_messages, loading } = state.notice;
  const { accesstoken } = state.home;
  return { data, chat_history, has_read_messages, hasnot_read_messages, accesstoken, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    init() {
      dispatch({
        type: 'notice/init',
      });
    },
    query(params) {
      dispatch({
        type: 'notice/query',
        payload: params,
      });
    },
    saveMessage(params) {
      dispatch({
        type: 'notice/save_message',
        payload: params,
      });
    },
    save_contacts(params) {
      dispatch({
        type: 'notice/save_contacts',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTouch: {
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 15
  },

  rowList: {
    marginTop: 10,
  },

  row: {
    paddingLeft: 27,
    paddingRight: 27,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  rowImg: {
    width: 20,
    height: 20,
    marginRight: 20,
  },

  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },

  rowInner: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  iconBtn: {
    width: 25,
    height: 25,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
