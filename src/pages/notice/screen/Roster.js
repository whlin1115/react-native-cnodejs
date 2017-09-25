import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Tip } from '../../../components';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Alert, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Roster extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '好友申请',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    // this.props.query(params)
  }

  _onLongPress = (user) => {
    const { owner } = this.props
    Alert.alert(
      '是否删除？', null,
      [
        { text: '取消', onPress: () => console.log('cancle') },
        { text: '确定', onPress: () => this.props.delete({ user, owner }) },
      ]
    )
  }

  _renderRow(item) {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity onPress={() => { navigate('Information', { user: item }) }} onLongPress={() => { this._onLongPress(item) }}>
        <View style={styles.row}>
          <Image style={styles.rowImg} source={{ uri: item.avatar }} />
          <View style={styles.rowInner}>
            <Text style={styles.rowText}>{item.from}</Text>
            {
              item.type === 'subscribe' ?
                <Text style={styles.rowContent}>{item.status}</Text>
                : <Text style={styles.rowContent}>对方已经是您的好友</Text>
            }
          </View>
          {
            item.type === 'subscribe' ?
              <TouchableOpacity style={styles.options} onPress={() => { this.props.on_subscribe({ user: item }) }}>
                <Text style={styles.optionsText}>同意</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={[styles.options, { backgroundColor: '#999' }]}>
                <Text style={styles.optionsText}>已添加</Text>
              </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { strangers, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          strangers.length > 0 ?
            <View style={styles.rowList}>
              <FlatList
                style={{ width }}
                data={strangers}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => this._renderRow(item)}
              />
            </View>
            : <Tip message={{ text: '暂无消息' }} />
        }
      </View >
    );
  }
}

function mapStateToProps(state) {
  const { strangers, loading } = state.notice;
  const { user: owner } = state.home;
  return { strangers, owner, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    on_subscribe(params) {
      dispatch({
        type: 'notice/on_subscribe',
        payload: params,
      });
    },
    delete(params) {
      dispatch({
        type: 'notice/delete_application',
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
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  options: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#0079FD',
    borderRadius: 3,
  },

  optionsText: {
    fontSize: 12,
    color: '#FFFFFF',
  },

  rowContent: {
    fontSize: 14,
    color: '#999',
    lineHeight: 18,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
