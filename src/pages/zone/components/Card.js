
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Card({ item, navigate }) {

  return (
    <TouchableOpacity onPress={() => { navigate('Detail', { topic_id: item.id }) }}>
      <View style={styles.list}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.h3}>{item.title}</Text>
        </View >
        <View style={styles.content}>
          <View style={styles.timeView}>
            <Text style={styles.time}>{item.last_reply_at}</Text>
          </View>
          <View style={styles.p}>
            <Text style={styles.name}>{item.author.loginname}</Text>
          </View>
        </View>
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0'
  },

  header: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row'
  },

  h3: {
    flex: 1,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  timeView: {
    flex: 2,
    padding: 3,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: '#4B8CE2',
  },

  p: {
    flex: 8,
    padding: 3,
  },

  name: {
    color: '#999',
    fontSize: 12,
  },

  time: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default Card
