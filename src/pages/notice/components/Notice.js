
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Notice({ item }) {

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.h3}>{item.title}</Text>
      <View style={styles.content}>
        <Text style={styles.text}>{item.content}</Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },

  content: {
    marginTop: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#999',
  },

  h3: {
    fontSize: 16,
  },
});

export default Notice
