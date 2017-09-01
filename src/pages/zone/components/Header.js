import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, navigate } = this.props

    return (
      Object.keys(data).length == 0 ?
        <TouchableOpacity onPress={() => { navigate('Login') }}>
          <View style={styles.header}>
            <View style={styles.inner}>
              <Image source={require('../../../assets/images/header.png')} style={styles.avatar} />
              <View style={styles.col}>
                <Text style={styles.login}>未登录</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        : <View>
          <TouchableOpacity onPress={() => { navigate('About') }}>
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
          {/* <View style={styles.info}>
            <View style={styles.block}>
              <Image style={styles.infoBtn} source={require('../../../assets/images/integral.png')} resizeMode='contain' />
              <View>
                <Text style={styles.text}>积分</Text>
                <Text style={[styles.text, styles.sub]}>{data.score}</Text>
              </View>
            </View>
            <View style={styles.block}>
              <Image style={styles.infoBtn} source={require('../../../assets/images/github.png')} resizeMode='contain' />
              <View>
                <Text style={styles.text}>Github</Text>
                <Text style={[styles.text, styles.sub]}>{data.githubUsername}</Text>
              </View>
            </View>
          </View> */}
          <View style={styles.rowList}>
            <TouchableOpacity onPress={() => { navigate('Credits') }}>
              <View style={styles.row}>
                <Image style={styles.rowImg} source={require('../../../assets/images/integral.png')} resizeMode='contain' />
                <View style={styles.rowInner}>
                  <Text style={styles.rowText}>论坛积分</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigate('Github') }}>
              <View style={styles.row}>
                <Image style={styles.rowImg} source={require('../../../assets/images/github.png')} resizeMode='contain' />
                <View style={styles.rowInner}>
                  <Text style={styles.rowText}>代码仓库</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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

  login: {
    fontSize: 18,
    marginLeft: 15,
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

export default Header