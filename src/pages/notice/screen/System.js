import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Notice from '../components/Notice';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class System extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '系统消息',
    };
  };

  render() {
    const { system_messages, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          system_messages.length > 0 ?
            <View style={styles.rowList}>
              <FlatList
                style={{ width: width }}
                data={system_messages}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Notice item={item} />}
              />
            </View>
            : <View style={styles.msgView}>
              <Text style={styles.msg}>暂无消息</Text>
            </View>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { system_messages, loading } = state.notice;
  return { system_messages, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'zone/query',
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

  msgView: {
    padding: 30,
    justifyContent: 'center',
  },

  msg: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
