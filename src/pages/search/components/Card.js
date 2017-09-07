
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Card({ item, navigate }) {

  return (
    <TouchableOpacity onPress={() => { navigate('Detail', { topic_id: item.id }) }}>
      <View style={styles.list}>
        <Text numberOfLines={1} style={styles.h3}>{item.title}</Text>
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.b}>{item.content}</Text>
        </View>
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 10,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#FFF',
  },

  h3: {
    fontSize: 16,
  },

  content: {
    marginTop: 10,
  },

  b: {
    fontSize: 14,
    lineHeight: 24,
    color: '#999',
  },
});

export default Card
