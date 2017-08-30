import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#d5dbdb',
    backgroundColor: '#FFFFFF',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  span: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#999',
    fontSize: 12,
  },

  name: {
    color: '#000000',
    fontSize: 16,
  },

  col: {
    flex: 1,
  },

  info: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d5dbdb',
    backgroundColor: '#FFFFFF',
  },

  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  infoBtn: {
    width: 36,
    height: 36,
  },

  text: {

  }

});