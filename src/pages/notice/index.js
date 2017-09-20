import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import WebIM from '../../utils/webIM';
import Message from './components/Message';
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
        console.log(`=== onOpened: ${message} ===`)
      },
      onClosed: (message) => { console.log(`=== onClosed: ${message} ===`) },     //连接关闭回调
      onPresence: (message) => { console.log(`=== onPresence: ${message} ===`) },     //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: (message) => { console.log(`=== onRoster: ${message} ===`) },     //处理好友申请
      onInviteMessage: (message) => { console.log(`=== onInviteMessage: ${message} ===`) },     //处理群组邀请
      onOnline: () => { console.log(`=== onOnline...`) },     //本机网络连接成功
      onOffline: () => { console.log(`=== onOffline...`) },     //本机网络掉线
      onError: (message) => { console.log(`=== onError: ${message} ===`) },       //失败回调
      onBlacklistUpdate: (list) => { console.log(`=== onBlacklistUpdate: ${list} ===`); },      // 黑名单变动查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
      onCreateGroup: (message) => { console.log(`=== onCreateGroup: ${message} ===`) },     //创建群组成功回执（需调用createGroupNew）
    });
  }

  render() {
    const { data, has_read_messages, hasnot_read_messages, accesstoken, loading } = this.props
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
          <TouchableOpacity onPress={() => { navigate('Read') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/comment.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>已读消息</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Chat') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/notice.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>聊天界面</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          hasnot_read_messages.length > 0 ?
            <View style={styles.rowList}>
              <FlatList
                style={{ width: width }}
                data={hasnot_read_messages}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Message navigate={navigate} item={item} />}
              />
            </View>
            : <View style={styles.msgViw}>
              <Text style={styles.msg}>暂无消息</Text>
            </View>
        }
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { data, has_read_messages, hasnot_read_messages, loading } = state.notice;
  const { accesstoken } = state.home;
  return { data, has_read_messages, hasnot_read_messages, accesstoken, loading };
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  },

  msgViw: {
    padding: 30,
    justifyContent: 'center',
  },

  msg: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
