import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { View, Text, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import styles from './style';

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
        {/* <View style={styles.bgImageWrapper}>
          <Image source={require('../../assets/images/launch_bg.png')} style={styles.bgImage} />
        </View> */}
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} resizeMode='contain' />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholder='输入Access Token'
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
