import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window')
const inputWidth = width - (44 + 15) * 2 - 39
const rightWidth = width - 44

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  render() {
    const _onPress = () => {
      const params = { content: this.state.text }
      this.props.query(params)
    }

    return (
      <View style={styles.headerRight}>
        <View style={styles.inputView}>
          <Image style={styles.headerBtn} source={require('../../../assets/images/searchbar.png')} resizeMode='contain' />
          <TextInput style={styles.input}
            placeholder='搜索话题'
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text }) }}
          />
        </View>
        <TouchableOpacity style={styles.headerTouch} onPress={() => { _onPress() }}>
          <Text style={styles.text}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
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
    marginRight: 10,
    width: inputWidth,
  },

  headerBtn: {
    width: 20,
    height: 20,
    margin: 4,
  },

});

function mapStateToProps(state) {
  const { data, loading } = state.search;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'search/query',
        payload: params,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);