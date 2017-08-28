import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  headerLeft: {
    width: 80,
    marginLeft: 15
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});