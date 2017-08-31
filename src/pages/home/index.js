import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import styles from './style';

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerLeft: (
        <Image style={styles.headerLeft} source={require('../../assets/images/logo.png')} resizeMode='contain' />
      ),
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Search') }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/search.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      ),
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={styles.iconBtn}
          source={!focused ? require('../../assets/images/home_0.png') : require('../../assets/images/home_1.png')} />
      ),
      tabBarLabel: '话题',
      mode: 'card',
      headerMode: 'float',
    };
  };

  componentDidMount() {
    this.props.query()
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: width }}
          data={data}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Wrap navigate={navigate} item={item} />}
        />
        <TouchableOpacity onPress={() => { navigate('Publish') }}>
          <Image style={styles.pubilsh} source={require('../../assets/images/add.png')} resizeMode='contain' />
        </TouchableOpacity>
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
