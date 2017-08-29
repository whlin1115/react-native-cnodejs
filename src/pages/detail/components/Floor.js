
import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { HtmlView } from '../../../components';

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20

function Floor({ item, navigate }) {

  return (
    <View style={styles.list}>
      <View style={styles.user}>
        <Image source={{ uri: item.author.avatar_url }} style={styles.head} />
        <View style={styles.info}>
          <View style={styles.cl}>
            <Text style={styles.name}>{item.author.loginname}</Text>
            <Text style={styles.name}>{item.create_at}</Text>
          </View>
          <View style={styles.cr}>
            <Text style={styles.ups}>{item.ups.length}</Text>
            <Image style={styles.icon} source={require('../../../assets/images/like.png')} resizeMode='contain' />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <HtmlView html={item.content} styles={htmlStyles} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: '#d5dbdb'
  },

  user: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
  },

  head: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  cl: {
    flex: 1,
  },

  name: {
    color: '#626262',
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },

  cr: {
    marginTop: 5,
    alignItems: 'stretch',
    flexDirection: 'row',
  },

  icon: {
    width: 18,
    height: 18,
    marginLeft: 10,
  },

  content: {
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },

  ups: {
    fontSize: 12,
    color: '#626262',
    paddingTop: 3,
    paddingBottom: 3,
  },

});


const htmlStyles = StyleSheet.create({
  a: {
    color: '#4078c0',
  },

  p: {
    fontSize: 14,
    lineHeight: 18,
  },

  img: {
    width: defaultMaxImageWidth
  }

});

export default Floor
