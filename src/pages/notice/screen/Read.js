import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Tip } from '../../../components';
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
    const { messages } = this.props.navigation.state.params;
    const { loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          messages.length > 0 ?
            <FlatList
              style={{ width: width }}
              data={messages}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <Message navigate={navigate} item={item} />}
            />
            : <Tip message={{ text: '暂无消息' }} />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.notice;
  return { loading };
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);
