import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import WebIM from '../../../utils/webIM';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Chat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '聊天界面',
    };
  };

  componentDidMount() {
    this.props.chat()
    WebIM.conn.listen({
      onTextMessage: (message) => { console.log(`=== onTextMessage: ${message} ===`) },     //收到文本消息
      onEmojiMessage: (message) => { console.log(`=== onEmojiMessage: ${message} ===`) },     //收到表情消息
      onPictureMessage: (message) => { console.log(`=== onPictureMessage: ${message} ===`) },     //收到图片消息
      onCmdMessage: (message) => { console.log(`=== onCmdMessage: ${message} ===`) },     //收到命令消息
      onAudioMessage: (message) => { console.log(`=== onAudioMessage: ${message} ===`) },     //收到音频消息
      onLocationMessage: (message) => { console.log(`=== onLocationMessage: ${message} ===`) },     //收到位置消息
      onFileMessage: (message) => { console.log(`=== onFileMessage: ${message} ===`) },     //收到文件消息
      onPresence: (message) => { console.log(`=== onPresence: ${message} ===`) },     //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onReceivedMessage: (message) => { console.log(`=== onReceivedMessage: ${message} ===`) },     //收到消息送达客户端回执
      onDeliveredMessage: (message) => { console.log(`=== onDeliveredMessage: ${message} ===`) },     //收到消息送达服务器回执
      onReadMessage: (message) => { console.log(`=== onReadMessage: ${message} ===`) },     //收到消息已读回执
      onMutedMessage: (message) => { console.log(`=== onMutedMessage: ${message} ===`) }      //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });
  }

  render() {
    const { system_messages, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.msgView}>
          <Text style={styles.msg}>暂无消息</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { system_messages, loading } = state.notice;
  return { system_messages, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    chat(params) {
      dispatch({
        type: 'notice/send_message',
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

  msgView: {
    padding: 30,
    justifyContent: 'center',
  },

  msg: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
