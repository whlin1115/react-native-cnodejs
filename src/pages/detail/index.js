import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import { Floor, Info, Option } from './components';
import { HtmlView } from '../../components';
import { StyleSheet, View, Text, TextInput, RefreshControl, Button, Image, StatusBar, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20
const defaultInputWidth = width - 40

class Detail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
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

  _onSend = () => {
    const { accesstoken, user, content, data } = this.props
    const params = { content, user, accesstoken, topic_id: data.id }
    this.refs._scrollView.scrollToEnd()
    this.props.comment(params)
  }

  render() {
    const { data, replies, content, loading, accesstoken } = this.props;
    const { navigate, state } = this.props.navigation;
    const infoProps = { data, navigate }
    const htmlProps = { html: data.content, styles: htmlStyles }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} ref="_scrollView" refreshControl={<RefreshControl onRefresh={() => { this.props.query({ ...state.params, accesstoken }) }} refreshing={loading} />}>
          <Info {...infoProps} />
          {
            data.content ?
              <View style={styles.connect}>
                <HtmlView {...htmlProps} />
              </View> : null
          }
          {
            replies.length > 0 ? <View style={styles.reply}>
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
        <View style={styles.inputView}>
          <View style={styles.contentView}>
            <TextInput style={styles.input}
              value={content}
              placeholder='发表评论'
              underlineColorAndroid="transparent"
              onChangeText={(content) => { this.props.setContent(content) }}
            />
            <TouchableOpacity style={styles.contentTouch} onPress={() => { this._onSend() }}>
              <Image style={styles.contentImg} source={require('../../assets/images/send.png')} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { data, replies, content, loading } = state.detail;
  const { accesstoken, user } = state.zone
  return { data, accesstoken, loading, content, replies, user };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'detail/query',
        payload: params,
      });
    },
    setContent(params) {
      dispatch({
        type: 'detail/content',
        payload: params,
      });
    },
    comment(params) {
      dispatch({
        type: 'detail/comment',
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
    paddingBottom: 44,
    backgroundColor: '#FFFFFF',
  },

  scrollView: {
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
  },

  inputView: {
    position: 'absolute',
    bottom: 0,
  },

  contentTouch: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentImg: {
    width: 24,
    height: 24,
  },

  contentView: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    width: defaultInputWidth,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  commentTouch: {
    height: 30,
  },
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
