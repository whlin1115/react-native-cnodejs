
import React, { Component, PureComponent } from 'react'
import { connect } from 'dva/mobile';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native'

class ChatRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onLongPress = (user) => {
    const { owner } = this.props
    Alert.alert(
      '删除信息？', null,
      [
        { text: '取消', onPress: () => console.log('cancle') },
        { text: '确定', onPress: () => this.props.delete({ user, owner }) },
      ]
    )
  }

  render() {
    const { item, navigate } = this.props

    return (
      <TouchableOpacity onPress={() => { navigate('Chat', { user: item }) }} onLongPress={() => { this._onLongPress(item) }}>
        <View style={styles.row}>
          <Image style={styles.avatar} source={{ uri: item.avatar }} />
          <View style={styles.rowInner}>
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.name}>{item.name ? item.name : '未知'}</Text>
              <Text numberOfLines={1} style={styles.time}>{item.createdAt}</Text>
            </View>
            <Text numberOfLines={1} style={styles.content}>{item.text ? item.text : '无'}</Text>
          </View>
        </View>
      </TouchableOpacity >
    )
  }
}


function mapStateToProps(state) {
  const { loading } = state.notice;
  const { user: owner } = state.home;
  return { owner, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    delete(params) {
      dispatch({
        type: 'notice/delete_sigle_chat',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  row: {
    paddingLeft: 17,
    paddingRight: 17,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },

  rowInner: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: '400',
  },

  content: {
    fontSize: 14,
    color: '#999',
    paddingTop: 3,
  },

  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRow);
