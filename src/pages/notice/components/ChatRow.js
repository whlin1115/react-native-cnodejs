
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function ChatRow({ item, navigate }) {

  return (
    <TouchableOpacity onPress={() => { navigate('Chat', { user: item.name }) }}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowInner}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.content}>{item.text}</Text>
        </View>
      </View>
    </TouchableOpacity >
  )
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

export default ChatRow
