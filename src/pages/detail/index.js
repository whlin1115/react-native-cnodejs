import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Info from './components/Info';
import Floor from './components/Floor';
import Option from './components/Option';
import { Html, HtmlView } from '../../components';
import { StyleSheet, View, Text, RefreshControl, Button, Image, StatusBar, FlatList, Dimensions, ScrollView, WebView, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20

class Detail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const { params } = navigation.state;
    return {
      headerTitle: '话题',
      headerRight: (<Option params={params} navigation={navigation} />)
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { accesstoken } = this.props
    this.props.query({ ...params, accesstoken })
  }

  componentWillUnmount() {
    this.props.clean()
  }

  render() {
    const { data, replies, loading, accesstoken } = this.props;
    const { navigate, state } = this.props.navigation;
    const infoProps = { data, navigate }
    const htmlProps = { html: data.content, styles: htmlStyles }

    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => { this.props.query({ ...state.params, accesstoken }) }} refreshing={loading} />}>
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
  const { data, replies, loading } = state.detail;
  const { accesstoken } = state.zone
  return { data, accesstoken, loading, replies };
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
    backgroundColor: '#FFFFFF',
  },

  headerLeft: {
    width: 80,
    marginLeft: 15
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
