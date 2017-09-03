import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Message from '../components/Message';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Read extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '已读消息',
    };
  };

  render() {
    const { has_read_messages, loading } = this.props
    const { navigate, state } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          has_read_messages.length > 0 ?
            <FlatList
              style={{ width: width }}
              data={has_read_messages}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <Message navigate={navigate} item={item} />}
            /> : <View style={styles.msgViw}>
              <Text style={styles.msg}>暂无消息</Text>
            </View>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { has_read_messages, loading } = state.notice;
  return { has_read_messages, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'notice/query',
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
  
  msgViw: {
    padding: 30,
    justifyContent: 'center',
  },

  msg: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);
