import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import WebIM from '../../../utils/webIM';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')
const defaultInputWidth = width - 40

class Chat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const { user } = state.params;
    return {
      headerTitle: `${user}`,
    };
  };

  componentDidMount() {
    WebIM.conn.listen({
      onTextMessage: (message) => this._onReceive(message),     //收到文本消息
      onEmojiMessage: (message) => { console.log(`=== onEmojiMessage ===`) },     //收到表情消息
      onPictureMessage: (message) => { console.log(`=== onPictureMessage ===`) },     //收到图片消息
      onCmdMessage: (message) => { console.log(`=== onCmdMessage ===`) },     //收到命令消息
      onAudioMessage: (message) => { console.log(`=== onAudioMessage ===`) },     //收到音频消息
      onLocationMessage: (message) => { console.log(`=== onLocationMessage ===`) },     //收到位置消息
      onFileMessage: (message) => { console.log(`=== onFileMessage ===`) },     //收到文件消息
      onPresence: (message) => { console.log(`=== onPresence ===`) },     //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onReceivedMessage: (message) => { console.log(`=== onReceivedMessage ===`) },     //收到消息送达客户端回执
      onDeliveredMessage: (message) => { console.log(`=== onDeliveredMessage ===`) },     //收到消息送达服务器回执
      onReadMessage: (message) => { console.log(`=== onReadMessage ===`) },     //收到消息已读回执
      onMutedMessage: (message) => { console.log(`=== onMutedMessage ===`) }      //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });
  }

  _onSend = (messages = []) => {
    this.setState((previousState) => ({ messages: GiftedChat.append(previousState.messages, messages) }));
    const { user } = this.props.navigation.state.params;
    const [message] = messages
    const params = { to: user, msg: message.text }
    this.props.sendMessage(params)
  }

  _onReceive = (message) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: message.data,
          createdAt: new Date(),
          user: {
            _id: message.from,
            name: message.from,
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  _renderBubble(props) {
    return (<Bubble {...props} wrapperStyle={{ left: { backgroundColor: '#FFF' }, }} />);
  }

  _renderFooter(props) {
    return (null);
  }

  render() {
    const { user, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <GiftedChat
          messages={this.state.messages}
          placeholder="请输入..."
          isAnimated={true}
          renderAvatarOnTop={true}
          showUserAvatar={true}
          onSend={(messages) => this._onSend(messages)}
          renderBubble={this._renderBubble.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          user={{ _id: user.loginname, name: user.loginname, avatar: user.avatar_url }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.notice;
  const { user } = state.home;
  return { loading, user };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage(params) {
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

  inputView: {
    position: 'absolute',
    bottom: 0,
  },

  contentTouch: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentImg: {
    width: 24,
    height: 24,
  },

  contentView: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  input: {
    width: defaultInputWidth,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  commentTouch: {
    height: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
