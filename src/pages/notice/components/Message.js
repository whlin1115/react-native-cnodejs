
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Message({ item, navigate }) {

  return (
    <TouchableOpacity onPress={() => { navigate('Detail', { id: item.topic.id }) }}>
      <View style={styles.list}>
        <View style={styles.header}>
          <Image source={{ uri: item.author.avatar_url }} style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.row}>
              <Text style={styles.span}>{item.author.loginname}</Text>
              <Text style={styles.time}>1小时前</Text>
            </View>
            <View style={styles.reply}>
              <Text numberOfLines={1} style={styles.span}>{item.reply.content}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.tip}></View>
          <Text numberOfLines={1} style={styles.h3}>{item.topic.title}</Text>
        </View >
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingLeft: 15,
    paddingBottom: 10,
    flexDirection: 'row'
  },

  content: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  row: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  tip: {
    width: 3,
    height: 20,
    marginRight: 10,
    backgroundColor: '#4B8CE2',
  },

  time: {
    fontSize: 12,
    color: '#999',
  },

  h3: {
    flex: 8,
    overflow: 'hidden',
    fontSize: 12,
    color: '#999',
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

  span: {
    fontSize: 14,
  },

  reply: {
    marginTop: 10,
  }
});

export default Message
