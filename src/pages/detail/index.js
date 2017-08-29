import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import Info from './components/Info';
import { View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import styles from './style';

class Detail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { }}>
            <Image style={[styles.headerBtn, styles.headerImg]} source={require('../../assets/images/collect.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.query(params)
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props;
    const { navigate } = this.props.navigation;
    const infoProps = { data, navigate }

    return (
      <View style={styles.container}>
        <Info {...infoProps}></Info>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.detail;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'detail/query',
        payload: params,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
