import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'

class Notice extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '设置',
    };
  };

  render() {
    const { data, loading, navigation } = this.props
    const { navigate } = this.props.navigation

    const _onLogout = () => {
      AsyncStorage.removeItem('user')
      this.props.clean()
      navigation.goBack()
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Password') }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <Text style={[styles.rowText, styles.rowBtn]}>修改密码</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { _onLogout() }}>
            <View style={styles.row}>
              <View style={styles.rowInner}>
                <Text style={[styles.rowText, styles.rowBtn]}>退出登录</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.zone;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    clean(params) {
      dispatch({
        type: 'zone/clean',
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

  rowBtn: {
    textAlign: 'center',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
