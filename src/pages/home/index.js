import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerLeft: (
        <Image style={styles.headerLeft} source={require('../../assets/images/logo.png')} resizeMode='contain' />
      ),
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Search') }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/search.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      ),
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={styles.iconBtn}
          source={!focused ? require('../../assets/images/home_0.png') : require('../../assets/images/home_1.png')} />
      ),
      tabBarLabel: '话题',
      mode: 'card',
      headerMode: 'float',
    };
  };

  componentDidMount() {
    const { tab } = this.props
    const params = { tab }
    this.props.query(params)
  }

  _onEndReached = (pageSize) => {
    const { tab } = this.props
    const page = pageSize + 1
    this.props.query({ page, tab })
  }

  _onSwitch = (tab) => {
    this.refs._flatlist.scrollToOffset({ animated: true, offset: 0 });
    this.props.query({ tab })
  }

  render() {
    const { data, page, loading, tab } = this.props
    const { navigate } = this.props.navigation;
    const tabs = [{ key: 'all', value: '全部' }, { key: 'good', value: '精华' }, { key: 'share', value: '分享' }, { key: 'ask', value: '问答' }, { key: 'dev', value: '测试' }]

    return (
      <View style={styles.container}>
        <View style={styles.tabsView}>
          {
            tabs.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => { this._onSwitch(item.key) }}>
                <View style={[styles.tabView, item.key == tab ? styles.tabActive : null]}>
                  <Text style={[styles.tabText, item.key == tab ? styles.textActive : null]}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: width }}
          ref="_flatlist"
          data={data}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Wrap navigate={navigate} item={item} />}
          onRefresh={() => { this.props.query({ tab }) }}
          onEndReached={() => { this._onEndReached(page) }} // 如果直接 this.props.query() 会请求两次
          onEndReachedThreshold={0.5}
          refreshing={loading}
        />
        <TouchableOpacity onPress={() => { navigate('Publish') }}>
          <Image style={styles.pubilsh} source={require('../../assets/images/add.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { tab, page, data, loading } = state.home;
  return { tab, page, data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'home/query',
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

  headerLeft: {
    height: 44,
    width: 80,
    marginLeft: 15
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

  iconBtn: {
    width: 25,
    height: 25,
  },

  headerImg: {
    borderRadius: 15,
  },

  pubilsh: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 44,
    height: 44,
  },

  tabsView: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  tabView: {
    padding: 15,
  },

  tabText: {
    fontSize: 14,
  },

  tabActive: {
    borderBottomWidth: 1.5,
    borderColor: '#4181DE',
  },

  textActive: {
    fontWeight: 'bold',
    color: '#4181DE',
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
