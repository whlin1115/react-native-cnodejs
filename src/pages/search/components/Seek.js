import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window')
const inputWidth = width - (44 + 15) * 2 - 35 - 4 - 24 // 减去的宽度分别是 导航栏按钮+margin*2，关闭按钮
const rightWidth = width - 44

class Seek extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }
  }

  componentWillReceiveProps(next) {
    const { content } = this.props;
    if (next.content !== content) {
      this.setState({ text: next.content })
    }
  }

  render() {
    const { records, visible, loading } = this.props

    const _onSearch = () => {
      const text = this.state.text
      if (!text) return
      const params = { content: text }
      this.props.query(params)
    }

    const _onClean = () => {
      const text = ''
      this.setState({ text })
      this.props.clean()
    }

    return (
      <View style={styles.headerRight}>
        <View style={styles.inputView}>
          <Image style={styles.headerBtn} source={require('../../../assets/images/searchbar.png')} resizeMode='contain' />
          <TextInput style={styles.input}
            placeholder='搜索话题'
            value={this.state.text}
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text }) }}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={() => { _onClean() }}>
            {!visible ? <Image style={styles.closeImg} source={require('../../../assets/images/clean.png')} resizeMode='contain' /> : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.headerTouch} onPress={() => { _onSearch() }}>
          <Text style={styles.text}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { records, content, visible, loading } = state.search;
  return { records, content, visible, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'search/query',
        payload: params,
      });
    },
    clean() {
      dispatch({
        type: 'search/clean',
      })
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