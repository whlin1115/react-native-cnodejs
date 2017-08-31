import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTouch: {
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 15
  },

  headerImg: {
    borderRadius: 15,
  },

  title: {
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },

  content: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  textarea: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  }

});