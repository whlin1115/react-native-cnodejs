
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Wrap({ item, navigate }) {

  return (
    <TouchableOpacity onpress={() => navigate('Detail', { id: item.id })}>
      <View style={styles.list}>
        <View style={styles.title}>
          <Text style={styles.tab}>{item.title}</Text>
        </View >
        <View style={styles.content}>
          <Image source={{ uri: item.author.avatar_url }} style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.p}>
              <Text style={styles.name}>{item.author.loginname}</Text>
              <View style={styles.status}>
                <Text style={styles.b}>{item.reply_count} / </Text>
                <Text style={styles.b}>{item.visit_count}</Text>
              </View>
            </View>
            <View style={styles.p}>
              <Text style={styles.time}>{item.create_at}</Text>
              <Text style={styles.time}>{item.last_reply_at}</Text>
            </View>
          </View>
        </View>
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  },

  li: {
    padding: 10,
  },

  text: {
    lineHeight: 1.5,
    fontWeight: 'bold',
  },

  tab: {
    marginRight: 10,
    marginTop: -6,
    padding: 5,
    fontWeight: '400',
    borderRadius: 5,
    textAlign: 'center',
  },

  top: {
    backgroundColor: '#e74c3c',
  },

  ask: {
    backgroundColor: '#3498db',
  },

  good: {
    backgroundColor: '#e67e22',
  },

  share: {
    backgroundColor: '#1abc9c',
  },

  default: {
    backgroundColor: '#e7e7e7',
  },

  content: {
    paddingTop: 10,
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

  p: {
    fontSize: 14,
  },

  p: {
    padding: 3,
  },

  name: {
    flex: 1,
  },

  time: {
    flex: 1,
  },

  b: {
    fontWeight: 'bold',
  }
});

export default Wrap
