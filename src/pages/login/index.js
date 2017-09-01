import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { StyleSheet, View, Text, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: '登录',
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

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} resizeMode='contain' />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholder='输入 Access Token'
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text }) }}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => { }}>
          <Text style={styles.login}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.login;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'login/query',
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
