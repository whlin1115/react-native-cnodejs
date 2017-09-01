import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { text: '49564492-25c9-4650-a49e-078ac4c7c383' }
  }

  componentWillReceiveProps(next) {
    const { data, navigation } = this.props;
    if (next.data && next.data !== data) {
      navigation.goBack()
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: '登录',
    };
  };

  render() {
    const { loading, navigation } = this.props

    const _onLogin = () => {
      const token = this.state.text
      if (!token) return
      const params = { accesstoken: token }
      this.props.login(params)
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('../../../assets/images/logo.png')} resizeMode='contain' />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            value={this.state.text}
            placeholder='输入 Access Token'
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text }) }}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => { _onLogin() }}>
          <Text style={styles.login}>登录</Text>
        </TouchableOpacity>
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
    login(params) {
      dispatch({
        type: 'zone/login',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },

  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },

  logoView: {
    alignItems: 'center',
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: '#282828',
  },

  logo: {
    width: 200,
  },

  inputView: {
    height: 44,
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },

  loginBtn: {
    padding: 15,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079FD',
  },

  login: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
