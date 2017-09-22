import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Tip } from '../../../components';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

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

  _renderRow(item) {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity onPress={() => { navigate('Information', { user: item }) }}>
        <View style={styles.row}>
          <Image style={styles.rowImg} source={{ uri: item.avatar }} />
          <View style={styles.rowInner}>
            <Text style={styles.rowText}>{item.name}</Text>
          </View>
          <Text style={styles.rowText}>{item.subscription}</Text>
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
  return { strangers, loading };
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

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
