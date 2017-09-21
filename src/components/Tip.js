
import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

function Tip({ message }) {

  return (
    <View style={styles.messageView}>
      <Text style={styles.message}>{message.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageView: {
    padding: 30,
    justifyContent: 'center',
  },

  message: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  },
});

export default Tip
