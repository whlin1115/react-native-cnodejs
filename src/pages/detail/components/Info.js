
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function Info({ data, navigate }) {

  return (
    data.title ?
      <View>
        <View style={styles.title}>
          <Text style={styles.h2}>{data.title}</Text>
        </View>
        <View style={styles.info}>
          <Image source={{ uri: data.author.avatar_url }} style={styles.avatar} />
          <View style={styles.col}>
            <Text style={styles.span}>{data.author.loginname}</Text>
            <Text style={styles.span}>发布于: {data.create_at}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.tab} >
              <Text style={styles.tag}>置顶</Text>
            </View>
            <Text style={styles.span}>{data.visit_count}次浏览</Text>
          </View>
        </View>
      </View>
      : null
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    margin: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  h2: {
    color: '#2c3e50',
    fontSize: 18,
    lineHeight: 1.5 * 18,
    fontWeight: 'bold',
  },

  info: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  col: {
    flex: 1,
  },

  h3: {
    flex: 1,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tab: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingBottom: 5,
    paddingRight: 15,
    borderRadius: 3,
    backgroundColor: '#e74c3c',
  },

  tag: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  span: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#34495e',
    fontSize: 12,
  },

  right: {
    alignItems: 'flex-end',
  }

});

export default Info
