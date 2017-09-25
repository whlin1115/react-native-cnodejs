import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = { is_collect: false }
  }

  _onCollect = (collect) => {
    const { accesstoken } = this.props
    const { topic_id } = this.props.params
    const params = { collect, topic_id, accesstoken }
    this.props.collect(params)
    if (!collect) this.props.delete(topic_id)
  }

  render() {
    const { is_collect, user, data, navigation } = this.props
    const { topic_id } = this.props.params;
    const { author = {} } = data

    return (
      <View style={styles.headerRight}>
        {
          user.loginname && user.loginname === author.loginname ?
            <TouchableOpacity style={styles.headerTouch} onPress={() => { navigation.navigate('Publish', { edit: true }) }}>
              <Image style={styles.headerBtn} source={require('../../../assets/images/edit.png')} resizeMode='contain' />
            </TouchableOpacity>
            : null
        }
        <TouchableOpacity style={styles.headerTouch} onPress={() => { this._onCollect(!is_collect) }}>
          <Image style={styles.headerBtn} source={is_collect ? require('../../../assets/images/collected.png') : require('../../../assets/images/collect.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { is_collect, data } = state.detail;
  const { accesstoken, user } = state.home
  return { is_collect, data, user, accesstoken };
}

function mapDispatchToProps(dispatch) {
  return {
    collect(params) {
      dispatch({
        type: 'detail/collect',
        payload: params,
      });
    },
    delete(params) {
      dispatch({
        type: 'zone/de_collect',
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
    height: 30,
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Option);