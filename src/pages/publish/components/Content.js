import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Modal, Dimensions, TouchableOpacity } from 'react-native';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { content = '' } = this.props.data
    this.props.setContent(content)
  }

  render() {
    const { tab, content } = this.props
    const { height } = Dimensions.get('window');
    const textareaHeight = height - 64 - 74 - 35

    return (
      <View style={styles.content}>
        <TextInput style={styles.textarea}
          value={content}
          multiline={true}
          minHeight={textareaHeight}
          placeholder='输入正文（至少12个字符）'
          underlineColorAndroid="transparent"
          onChangeText={(content) => { this.props.setContent(content) }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { content } = state.publish;
  const { data } = state.detail;
  return { data, content };
}

function mapDispatchToProps(dispatch) {
  return {
    setContent(params) {
      dispatch({
        type: 'publish/content',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  textarea: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);