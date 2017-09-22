import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Seek from '../components/Seek';
import { Tip } from '../../../components';
import { StyleSheet, View, ScrollView, RefreshControl, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class AddFriend extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerRight: (<Seek />)
    };
  };

  render() {
    const { info, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => { this.props.information({ user: info.name }) }} refreshing={loading} />}>
        <StatusBar barStyle="light-content" />
        {
          Object.keys(info).length > 0 ?
            <View style={styles.rowList}>
              <TouchableOpacity onPress={() => { navigate('Information', { user: info }) }}>
                <View style={styles.row}>
                  <Image style={styles.rowImg} source={{ uri: info.avatar_url }} />
                  <View style={styles.rowInner}>
                    <Text style={styles.rowText}>{info.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            : <Tip message={{ text: '该用户不存在' }} />
        }
      </ScrollView >
    );
  }
}

function mapStateToProps(state) {
  const { info, loading } = state.zone;
  return { info, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'notice/query',
        payload: params,
      });
    },
    information(params) {
      dispatch({
        type: 'zone/information',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  rowList: {
    marginTop: 10,
  },

  row: {
    paddingLeft: 27,
    paddingRight: 27,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  rowImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 16,
    fontWeight: '400',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
