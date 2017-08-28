import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { Wrap } from '../../components';
import { View, Text, Button, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import styles from './style';

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerStyle: {
        backgroundColor: '#2D2D2D'
      },
      headerLeft: (
        <Image style={styles.headerLeft} source={require('../../assets/images/logo.png')} resizeMode='contain' />
      ),
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/search.png')} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { }}>
            <Image style={[styles.headerBtn, styles.headerImg]} source={require('../../assets/images/header.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.query()
  }

  componentWillReceiveProps(next) {

  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Wrap navigate={navigate} item={item} />}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.home;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'home/query',
        payload: params,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
