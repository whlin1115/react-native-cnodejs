import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Personal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '个人资料',
    };
  };

  componentDidMount() {
    const { user } = this.props
    this.props.information({ user })
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { info, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>头像</Text>
              <Image source={{ uri: info.avatar_url }} style={styles.avatar} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>昵称</Text>
              <Text style={styles.span}>{info.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>微博</Text>
              <Text style={styles.span}>{info.weibo ? info.weibo : '未填写'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>个人网站</Text>
              <Text style={styles.span}>{info.url ? info.url : '未填写'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>所在地点</Text>
              <Text style={styles.span}>{info.location ? info.location : '未填写'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>个性签名</Text>
              <Text style={styles.span}>{info.signature ? info.signature : '未填写'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Password') }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>修改密码</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user, info, loading } = state.zone;
  return { user, info, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    information(params) {
      dispatch({
        type: 'zone/information',
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

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  span: {
    color: '#999',
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
