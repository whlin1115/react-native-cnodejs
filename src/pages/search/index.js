import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from './components/Card';
import Seek from './components/Seek';
import History from './components/History';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Search extends PureComponent {
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

  componentDidMount() {
    this.props.init();
  }

  componentWillUnmount() {
    this.props.clean()
  }

  _onEndReached = (pageSize) => {
    const page = pageSize + 1
    const { content } = this.props
    this.props.query({ page, content })
  }

  render() {
    const { data, page, content, visible, loading } = this.props
    const { navigate } = this.props.navigation;
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          visible ?
            <ScrollView>
              <History />
            </ScrollView>
            : <FlatList
              style={{ width: width }}
              data={data}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <Card navigate={navigate} item={item} />}
              onRefresh={() => { this.props.query({ content }) }}
              onEndReached={() => { this._onEndReached(page) }} // 如果直接 this.props.query() 会请求两次
              onEndReachedThreshold={0.5}
              refreshing={loading}
            />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, page, content, visible, loading } = state.search;
  return { data, page, content, visible, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    init() {
      dispatch({
        type: 'search/init',
      });
    },
    query(params) {
      dispatch({
        type: 'search/query',
        payload: params,
      });
    },
    clean() {
      dispatch({
        type: 'search/clean',
      })
    },
    record(params) {
      dispatch({
        type: 'search/record',
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

  headerLeft: {
    width: 80,
    marginLeft: 15
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
