import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Credits extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '论坛积分',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    // this.props.query(params)
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.scoreView}>
          <Text style={styles.scoreText}>{data.score}</Text>
        </View>
        <View style={styles.subTitle}>
          <Text style={styles.subText}>如何获取积分</Text>
        </View>
        <View style={styles.rowList}>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../../assets/images/header.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>登录论坛</Text>
              <Text style={styles.span}>+1</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../../assets/images/post.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>发布话题</Text>
              <Text style={styles.span}>+5</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.rowImg} source={require('../../../assets/images/comment.png')} resizeMode='contain' />
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>发表评论</Text>
              <Text style={styles.span}>+3</Text>
            </View>
          </View>
        </View>
      </View >
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

  scoreView: {
    padding: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subTitle: {
    paddingTop: 15,
    paddingLeft: 15,
  },

  subText: {
    fontSize: 14,
    color: '#999',
  },

  rowList: {
    marginTop: 15,
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
    justifyContent: 'space-between',
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

  span: {
    color: '#4E8EDF',
    fontSize: 16,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
