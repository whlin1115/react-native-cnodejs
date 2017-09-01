import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Info from './components/Info';
import { Html, HtmlView } from '../../components';
import Floor from './components/Floor';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, ScrollView, WebView, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20

class Detail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '主题',
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { }}>
            <Image style={styles.headerBtn} source={require('../../assets/images/collect.png')} resizeMode='contain' />
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

  componentWillUnmount() {
    this.props.clean()
  }

  render() {
    const { data, loading } = this.props;
    const { navigate } = this.props.navigation;
    const { width } = Dimensions.get('window');
    const infoProps = { data, navigate }
    const htmlProps = { html: data.content, styles: htmlStyles }
    const { replies } = data

    return (
      <ScrollView style={styles.container}>
        <Info {...infoProps} />
        {
          data.content ?
            <View style={styles.connect}>
              <HtmlView {...htmlProps} />
            </View> : null
        }
        {
          replies ? <View style={styles.reply}>
            <Text style={styles.total}>{replies.length}</Text><Text> 回复</Text>
          </View> : null
        }
        <FlatList
          style={{ width: width }}
          data={replies}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Floor navigate={navigate} item={item} />}
        />
      </ScrollView>
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
    clean() {
      dispatch({
        type: 'detail/clean',
      })
    }
  };
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
    marginRight: 10
  },

  connect: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },

  reply: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },

  total: {
    color: '#42b983',
    fontWeight: 'bold',
  }
});

const htmlStyles = StyleSheet.create({
  a: {
    color: '#4078c0',
  },

  p: {
    fontSize: 16,
    lineHeight: 24,
  },

  h2: {
    fontSize: 18,
  },

  h3: {
    fontSize: 24,
  },

  img: {
    width: defaultMaxImageWidth
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
