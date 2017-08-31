import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  
  rowList: {
    marginTop: 10,
  },

  row: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  rowImg: {
    width: 20,
    height: 20,
    marginRight: 20,
  },

  rowInner: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  rowText: {
    fontSize: 14,
    fontWeight: '400',
  },

  iconBtn: {
    width: 25,
    height: 25,
  },

});