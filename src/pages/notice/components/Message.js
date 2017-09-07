
import React, { Component, PureComponent } from 'react'
import { connect } from 'dva/mobile';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

class Message extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onRead = (item) => {
    const { accesstoken, navigate } = this.props
    const { has_read } = item
    const params = { msg_id: item.id, accesstoken }
    if (!has_read) this.props.mark_one(params)
    navigate('Detail', { topic_id: item.topic.id })
  }

  render() {
    const { item } = this.props

    return (
      <TouchableOpacity onPress={() => { this._onRead(item) }}>
        <View style={styles.list}>
          <View style={styles.content}>
            <View style={styles.tip}></View>
            <Text numberOfLines={1} style={styles.h3}>{item.topic.title}</Text>
          </View >
          <View style={styles.header}>
            <Image source={{ uri: item.author.avatar_url }} style={styles.avatar} />
            <View style={styles.info}>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.name}>{item.author.loginname}</Text>
                <Text style={styles.time}>{item.reply.create_at}</Text>
              </View>
              <View style={styles.reply}>
                <Text numberOfLines={1} style={styles.span}>{item.reply.content}</Text>
              </View>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  const { accesstoken } = state.zone
  const { hasnot_read_messages } = state.notice;
  return { accesstoken, hasnot_read_messages };
}

function mapDispatchToProps(dispatch) {
  return {
    mark_one(params) {
      dispatch({
        type: 'notice/mark_one',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 5,
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row'
  },

  content: {
    flex: 1,
    paddingBottom: 15,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  tip: {
    width: 3,
    height: 20,
    marginRight: 15,
    backgroundColor: '#4B8CE2',
  },

  time: {
    fontSize: 12,
    color: '#999',
  },

  h3: {
    flex: 8,
    overflow: 'hidden',
    fontSize: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  name: {
    flex: 1,
    color: '#999',
    fontSize: 12,
  },

  span: {
    flex: 1,
    fontSize: 14,
  },

  reply: {
    marginTop: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);