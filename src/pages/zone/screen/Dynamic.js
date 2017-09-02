import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from '../components/Card';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Dynamic extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { type } = navigation.state.params;
    const title = { 'reply': '最近回复', 'topic': '最新发布' }
    return {
      headerTitle: title[type],
    };
  };

  render() {
    const { data } = this.props
    const { navigate, state } = this.props.navigation;
    const { type } = state.params
    const recent = { 'reply': 'recent_replies', 'topic': 'recent_topics' }
    const list = data[recent[type]]
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: width }}
          data={list}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Card navigate={navigate} item={item} />}
        />
      </View >
    );
  }
}

function mapStateToProps(state) {
  const { data, collects, loading } = state.zone;
  return { data, collects, loading };
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dynamic);
