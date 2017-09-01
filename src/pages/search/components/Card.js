
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Card({ item, navigate }) {

  return (
    <TouchableOpacity onPress={() => { navigate('Detail', { id: item.id }) }}>
      <View style={styles.list}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.h3}>{item.title}</Text>
        </View >
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.b}>{item.content}</Text>
        </View>
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  h3: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },

  content: {
    paddingTop: 10,
  },

  b: {
    fontSize: 14,
    lineHeight: 24,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default Card
