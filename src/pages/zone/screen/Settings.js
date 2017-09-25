import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Switch, Dimensions, TouchableOpacity } from 'react-native'

class Notice extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      draft: true,
      notic: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '设置',
    };
  };

  componentDidMount() {
    const { setting } = this.props
    const { draft, notic } = setting
    this.setState({ draft, notic })
  }

  componentWillUnmount() {
    const { draft, notic } = this.state
    const setting = { draft, notic }
    this.props.config(setting)
  }

  _onLogout = () => {
    const { navigation } = this.props
    this.props.logout()
    navigation.goBack()
  }

  render() {
    const { data, loading, navigation } = this.props
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <View style={styles.left}>
                <Text style={styles.rowText}>新消息通知</Text>
                <View style={styles.subView}>
                  <Text style={styles.sub}>接收评论消息及系统消息通知</Text>
                </View>
              </View>
              <Switch style={styles.switch} value={this.state.notic} onValueChange={(value) => { this.setState({ notic: value }) }}></Switch>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <View style={styles.left}>
                <Text style={styles.rowText}>保存草稿</Text>
                <View style={styles.subView}>
                  <Text style={styles.sub}>未发布的话题内容自动保存</Text>
                </View>
              </View>
              <Switch style={styles.switch} value={this.state.draft} onValueChange={(value) => { this.setState({ draft: value }) }}></Switch>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Cache') }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>清除缓存</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Cache') }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <View style={styles.left}>
                  <Text style={styles.rowText}>检查更新</Text>
                  <View style={styles.subView}>
                    <Text style={styles.sub}>当前版本 0.1.2</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          Object.keys(data).length > 0 ?
            <View style={styles.rowList}>
              <TouchableOpacity onPress={() => { this._onLogout() }}>
                <View style={styles.row}>
                  <View style={styles.rowInner}>
                    <Text style={styles.rowText}>退出登录</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            : null
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, setting, loading } = state.zone;
  return { data, setting, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    config(params) {
      dispatch({
        type: 'zone/config',
        payload: params,
      });
    },
    logout(params) {
      dispatch({
        type: 'zone/logout',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#F0F0F0',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  subView: {
    marginTop: 8,
  },

  sub: {
    color: '#999',
    fontSize: 12,
  },

  left: {
    flex: 1
  },

  switch: {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
