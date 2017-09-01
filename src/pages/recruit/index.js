import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

class Recruit extends PureComponent {
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
          <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Publish') }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/recruit.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      ),
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={styles.iconBtn}
          source={!focused ? require('../../assets/images/job_0.png') : require('../../assets/images/job_1.png')} />
      ),
      tabBarLabel: '招聘',
    };
  };

  componentDidMount() {
    this.props.query({ tab: 'job' })
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.recruit;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'recruit/query',
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

  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTouch: {
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 15
  },

  headerImg: {
    borderRadius: 15,
  },

  iconBtn: {
    width: 25,
    height: 25,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Recruit);
