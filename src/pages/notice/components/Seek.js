import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window')
const inputWidth = width - (44 + 15) * 2 - 35 - 4 - 24 // 减去的宽度分别是 导航栏按钮+margin*2，关闭按钮
const rightWidth = width - 44

class Seek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visible: false
    }
  }

  _onSearch = (user) => {
    user = user.replace(/(^\s*)|(\s*$)/g, "")
    this.props.search({ user })
  }

  render() {
    const { loading } = this.props

    return (
      <View style={styles.headerRight}>
        <View style={styles.inputView}>
          <Image style={styles.headerBtn} source={require('../../../assets/images/searchbar.png')} resizeMode='contain' />
          <TextInput style={styles.input}
            placeholder='搜索用户'
            value={this.state.text}
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text, visible: true }) }}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={() => { this.setState({ text: '' }) }}>
            {this.state.visible ? <Image style={styles.closeImg} source={require('../../../assets/images/clean.png')} resizeMode='contain' /> : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.headerTouch} onPress={() => { this._onSearch(this.state.text) }}>
          <Text style={styles.text}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.notice;
  return { loading };
}

function mapDispatchToProps(dispatch) {
  return {
    search(params) {
      dispatch({
        type: 'zone/information',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    width: rightWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTouch: {
    padding: 15,
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    textAlign: 'center',
    width: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 15
  },

  inputView: {
    flexDirection: 'row',
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#FFFFFF',
    justifyContent: 'center',
  },

  input: {
    fontSize: 14,
    width: inputWidth,
  },

  headerBtn: {
    width: 20,
    height: 20,
    margin: 4,
  },

  closeImg: {
    width: 20,
    height: 20,
  },

  closeBtn: {
    width: 20,
    height: 20,
    margin: 4,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Seek);