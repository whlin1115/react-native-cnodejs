
import React, { Component, PureComponent } from 'react'
import { connect } from 'dva/mobile';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native'

class ChatRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onPress = (user) => {
    const { owner, navigate } = this.props
    navigate('Chat', { user })
    this.props.cleanCount({ user, owner })
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

  _renderWidth = ({ count }) => {
    if (count < 10) return 10
    else if (count > 10 && count < 100) return 10 * 2
    else if (count > 100 && count < 1000) return 10 * 3
    else if (count >= 1000) return 10 * 4
  }

  render() {
    const { item } = this.props
    const width = this._renderWidth(item)
    item.count = item.count <= 999 ? item.count : '+999'

    return (
      <TouchableOpacity onPress={() => { this._onPress(item) }} onLongPress={() => { this._onLongPress(item) }}>
        <View style={styles.row}>
          <View style={styles.avatarBox} >
            <Image style={styles.avatar} source={{ uri: item.avatar }} />
            {
              item.count !== 0 ?
                <View style={styles.countBox} >
                  <Text numberOfLines={1} style={[styles.count, { width }]}>{item.count}</Text>
                </View>
                : null
            }
          </View>
          <View style={styles.rowInner}>
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.name}>{item.name ? item.name : '未知'}</Text>
              <Text numberOfLines={1} style={styles.time}>{item.createdAt}</Text>
            </View>
            <Text numberOfLines={1} style={styles.content}>{item.text}</Text>
          </View>
        </View>
      </TouchableOpacity >
    )
  }
}


function mapStateToProps(state) {
  const { chat_history, loading } = state.notice;
  const { user: owner } = state.home;
  return { owner, chat_history, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    delete(params) {
      dispatch({
        type: 'notice/delete_sigle_chat',
        payload: params,
      });
    },
    cleanCount(params) {
      dispatch({
        type: 'notice/clean_count',
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

  avatarBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
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

  countBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 20,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F03737',
  },

  count: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRow);
