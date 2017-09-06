import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Modal, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const defaultInputWidth = width - 40
const defaultWidth = width - 90 * 2

class Input extends Component {
  constructor(props) {
    super(props);
  }

  _onSend = () => {
    const { accesstoken, user, content, data } = this.props
    const params = { content, user, accesstoken, topic_id: data.id }
    this.props.comment(params)
  }

  render() {
    const { content } = this.props

    return (
      <View style={styles.contentView}>
        <TextInput style={styles.input}
          value={content}
          placeholder='发表评论'
          underlineColorAndroid="transparent"
          onChangeText={(content) => { this.props.setContent(content) }}
        />
        <TouchableOpacity style={styles.contentTouch} onPress={() => { this._onSend() }}>
          <Image style={styles.contentImg} source={require('../../../assets/images/github.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading, content } = state.detail;
  const { accesstoken, user } = state.zone
  return { data, loading, content, accesstoken, user };
}

function mapDispatchToProps(dispatch) {
  return {
    setContent(params) {
      dispatch({
        type: 'detail/content',
        payload: params,
      });
    },
    comment(params) {
      dispatch({
        type: 'detail/comment',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  contentTouch: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentImg: {
    width: 24,
    height: 24,
  },

  contentView: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    width: defaultInputWidth,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  commentTouch: {
    height: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);