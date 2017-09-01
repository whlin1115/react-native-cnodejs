import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from './components/Card';
import { StyleSheet, View, ScrollView, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Zone extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '空间',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={styles.iconBtn}
          source={!focused ? require('../../assets/images/zone_0.png') : require('../../assets/images/zone_1.png')} />
      ),
      tabBarLabel: '我的',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.query({ user: 'linwh1115' })
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;
    const { width } = Dimensions.get('window');
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity onPress={() => { navigate('Login') }}>
          <View style={styles.header}>
            <View style={styles.inner}>
              <Image source={{ uri: data.avatar_url }} style={styles.avatar} />
              <View style={styles.col}>
                <Text style={[styles.span, styles.name]}>{data.loginname}</Text>
                <Text style={styles.span}>注册于： {data.create_at}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={styles.block}>
            <Image style={styles.infoBtn} source={require('../../assets/images/integral.png')} resizeMode='contain' />
            <View>
              <Text style={styles.text}>积分</Text>
              <Text style={[styles.text, styles.sub]}>{data.score}</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image style={styles.infoBtn} source={require('../../assets/images/github.png')} resizeMode='contain' />
            <View>
              <Text style={styles.text}>Github</Text>
              <Text style={[styles.text, styles.sub]}>{data.githubUsername}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/notice.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>我的消息</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/comment.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>我的评论</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/post.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>我的话题</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/collection.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>我的收藏</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Setting') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/setting.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>设置</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView >
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.zone;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'zone/query',
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

  span: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#999',
    fontSize: 12,
  },

  name: {
    color: '#000000',
    fontSize: 16,
  },

  col: {
    flex: 1,
  },

  info: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },

  block: {
    flex: 1,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  infoBtn: {
    width: 36,
    height: 36,
    marginRight: 15,
  },

  text: {
    fontSize: 14,
    padding: 3,
  },

  sub: {
    color: '#A4A4A4',
  },

  rowList: {
    marginTop: 10,
  },

  row: {
    paddingLeft: 30,
    paddingRight: 30,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
