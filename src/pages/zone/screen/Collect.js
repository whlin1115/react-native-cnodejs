import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from '../components/Card';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Collect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '话题收藏',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.query(params)
  }

  render() {
    const { collects, loading } = this.props
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: width }}
          data={collects}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Card navigate={navigate} item={item} />}
        />
      </View >
    );
  }
}

function mapStateToProps(state) {
  const { collects, loading } = state.zone;
  return { collects, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'zone/collects',
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

export default connect(mapStateToProps, mapDispatchToProps)(Collect);
