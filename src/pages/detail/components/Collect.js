import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = { is_collect: false }
  }

  _onCollect = (collect) => {
    const { data, accesstoken } = this.props
    const params = { collect, topic_id: data.id, accesstoken }
    this.props.collect(params)
    if (!collect) this.props.delete(data.id)
  }

  render() {
    const { is_collect } = this.props

    return (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerTouch} onPress={() => { this._onCollect(!is_collect) }}>
          <Image style={styles.headerBtn} source={is_collect ? require('../../../assets/images/collected.png') : require('../../../assets/images/collect.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, is_collect } = state.detail;
  const { accesstoken } = state.zone
  return { data, is_collect, accesstoken };
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
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Collect);