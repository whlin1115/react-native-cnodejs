import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class About extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '个人资料',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    // this.props.query(params)
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.rowList}>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>昵称</Text>
              <Text style={styles.span}>{data.loginname}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>个人网站</Text>
              <Text style={styles.span}></Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>所在地点</Text>
              <Text style={styles.span}></Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>微博</Text>
              <Text style={styles.span}></Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.rowText}>个性签名</Text>
              <Text style={styles.span}></Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.zone;
  return { data, loading };
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
    paddingLeft: 15,
    paddingRight: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '400',
  },

  span: {
    color: '#999',
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
