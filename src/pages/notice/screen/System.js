import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Tip } from '../../../components';
import Message from '../components/Message';
import { StyleSheet, View, ScrollView, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

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
    const { hasnot_read_messages, has_read_messages, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Read', { messages: has_read_messages }) }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../../assets/images/comment.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>已读消息</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          hasnot_read_messages.length > 0 ?
            <View style={styles.rowList}>
              <FlatList
                style={{ width: width }}
                data={hasnot_read_messages}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Message navigate={navigate} item={item} />}
              />
            </View>
            : <Tip message={{ text: '暂无消息' }} />
        }
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { hasnot_read_messages, has_read_messages, loading } = state.notice;
  return { hasnot_read_messages, has_read_messages, loading };
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
    fontSize: 16,
    fontWeight: '400',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
