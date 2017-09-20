import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

class Option extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    const { content, title, tab, accesstoken, edit, data } = this.props
    let params = {}
    if (edit) {
      params = { content, title, tab, accesstoken, topic_id: data.id }
      this.props.update(params)
    } else {
      params = { content, title, tab, accesstoken }
      this.props.create(params)
    }
  }

  render() {
    return (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerTouch} onPress={() => { this._onPress() }}>
          <Image style={[styles.headerBtn, styles.headerImg]} source={require('../../../assets/images/public.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { tab, content, title } = state.publish;
  const { data } = state.detail;
  const { accesstoken } = state.home
  return { tab, data, content, title, accesstoken };
}

function mapDispatchToProps(dispatch) {
  return {
    create(params) {
      dispatch({
        type: 'publish/create',
        payload: params,
      });
    },
    update(params) {
      dispatch({
        type: 'publish/update',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTouch: {
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Option);