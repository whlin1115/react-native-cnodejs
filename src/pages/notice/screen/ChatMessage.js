import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, ScrollView, Text, Button, Switch, Image, StatusBar, FlatList, Alert, Dimensions, TouchableOpacity } from 'react-native'

class ChatMessage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      top: false,
      mute: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '聊天信息',
    };
  };

  _onClean = (user) => {
    const { owner } = this.props
    Alert.alert(
      '清空当前聊天记录？', null,
      [
        { text: '取消', onPress: () => console.log('cancle') },
        { text: '确定', onPress: () => this.props.clean({ user, owner }) },
      ]
    )
  }

  render() {
    const { user } = this.props.navigation.state.params;
    const { loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.inner}>
            <View style={styles.avatarInner}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <View style={styles.textView}>
                  <Text style={styles.rowText}>查找聊天记录</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowList}>
          <View style={styles.row}>
            <View style={[styles.rowInner, styles.rowSwitch]}>
              <View style={styles.left}>
                <Text style={styles.rowText}>消息置顶</Text>
              </View>
              <Switch style={styles.switch} value={this.state.top} onValueChange={(value) => { this.setState({ top: value }) }}></Switch>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.rowInner, styles.rowSwitch]}>
              <View style={styles.left}>
                <Text style={styles.rowText}>消息免打扰</Text>
              </View>
              <Switch style={styles.switch} value={this.state.mute} onValueChange={(value) => { this.setState({ mute: value }) }}></Switch>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <View style={styles.textView}>
                  <Text style={styles.rowText}>设置当前聊天背景</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { this._onClean(user) }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <View style={styles.textView}>
                  <Text style={styles.rowText}>清空聊天记录</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView >
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.notice;
  const { user: owner } = state.home;
  return { owner, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    clean(params) {
      dispatch({
        type: 'notice/clean_sigle_history',
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

  header: {
    backgroundColor: '#FFFFFF',
  },

  inner: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  avatarInner: {
    margin: 15,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },

  sub: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#999',
    fontSize: 12,
  },

  login: {
    fontSize: 18,
    marginLeft: 15,
  },

  name: {
    width: 50,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
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

  rowInner: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  rowSwitch: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  textView: {
    flex: 3,
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  spanView: {
    flex: 7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
