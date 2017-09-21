import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Tip } from '../../../components';
import { StyleSheet, View, ScrollView, RefreshControl, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Information extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '详细资料',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.information(params)
  }

  componentWillUnmount() {
    this.props.clean()
  }

  render() {
    const { user } = this.props.navigation.state.params;
    const { info, loading } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => { this.props.information({ user }) }} refreshing={loading} />}>
        <StatusBar barStyle="light-content" />
        {
          Object.keys(info).length > 0 ?
            <View style={styles.infoBox}>
              <TouchableOpacity onPress={() => { navigate('Center', { user: info.name }) }}>
                <View style={styles.header}>
                  <View style={styles.inner}>
                    <Image source={{ uri: info.avatar_url }} style={styles.avatar} />
                    <View style={styles.col}>
                      <Text style={[styles.span, styles.name]}>{info.name}</Text>
                      <Text style={styles.sub}>昵称: {info.name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.rowList}>
                <View style={styles.row}>
                  <View style={styles.rowInner}>
                    <View style={styles.textView}>
                      <Text style={styles.rowText}>微博</Text>
                    </View>
                    <View style={styles.spanView}>
                      <Text numberOfLines={1} style={styles.span}>{info.weibo ? info.weibo : '未填写'}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rowInner}>
                    <View style={styles.textView}>
                      <Text style={styles.rowText}>个人网站</Text>
                    </View>
                    <View style={styles.spanView}>
                      <Text numberOfLines={1} style={styles.span}>{info.home ? info.home : '未填写'}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rowInner}>
                    <View style={styles.textView}>
                      <Text style={styles.rowText}>所在地点</Text>
                    </View>
                    <View style={styles.spanView}>
                      <Text numberOfLines={1} style={styles.span}>{info.location ? info.location : '未填写'}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.rowInner}>
                    <View style={styles.textView}>
                      <Text style={styles.rowText}>个性签名</Text>
                    </View>
                    <View style={styles.spanView}>
                      <Text numberOfLines={1} style={styles.span}>{info.signature ? info.signature : '未填写'}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.sendBtn} onPress={() => { navigate('Chat', { user }) }}>
                <Text style={styles.send}>发送消息</Text>
              </TouchableOpacity>
            </View>
            : <Tip message={{ text: '暂未开通' }} />
        }
      </ScrollView >
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.notice;
  const { info } = state.zone;
  return { info, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    information(params) {
      dispatch({
        type: 'zone/information',
        payload: params,
      });
    },
    clean() {
      dispatch({
        type: 'zone/cleanInfo',
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
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
    color: '#000000',
    fontSize: 16,
  },

  col: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
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

  span: {
    color: '#999',
    fontSize: 14,
  },

  sendBtn: {
    padding: 15,
    margin: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079FD',
  },

  send: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Information);
