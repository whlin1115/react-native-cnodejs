import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from './components/Card';
import Header from './components/Header';
import { RowItem } from '../../components';
import { StyleSheet, View, ScrollView, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'

const { width } = Dimensions.get('window');

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

  async componentDidMount() {
    var data = await AsyncStorage.getItem('user') || '{}'
    const user = JSON.parse(data)
    if (user.success) this.props.query(user)
  }

  render() {
    const { user, data, loading } = this.props
    const { navigate } = this.props.navigation;
    const headerProps = { data, navigate }

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header {...headerProps} />
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Reply') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/comment.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>我的评论</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Topic') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/post.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>我的话题</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Collect') }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../assets/images/collection.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>我的收藏</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  const { user, data, loading } = state.zone;
  return { user, data, loading };
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
