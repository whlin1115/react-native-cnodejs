import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

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
    // this.props.query()
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/notice.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>系统消息</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/post.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>未读消息</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../assets/images/comment.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>已读消息</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.notice;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
