import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Wrap from './components/Wrap';
import { View, ScrollView, Text, TextInput, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import styles from './style';

class Publish extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      content: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: '发布',
      headerRight: (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Zone', { user: 'alsotang' }) }}>
            <Image style={[styles.headerBtn, styles.headerImg]} source={require('../../assets/images/public.png')} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  componentDidMount() {
    // this.props.query()
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    if (next.params !== params) {

    }
  }

  render() {
    const { data, loading } = this.props
    const { navigate } = this.props.navigation;
    const { height } = Dimensions.get('window');
    const textareaHeight = height - 64 - 74 - 35

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.title}>
          <TextInput style={styles.input}
            placeholder='输入标题'
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ text }) }}
          />
        </View>
        <View style={styles.content}>
          <TextInput style={styles.textarea}
            multiline={true}
            minHeight={textareaHeight}
            placeholder='输入正文（至少12个字符）'
            underlineColorAndroid="transparent"
            onChangeText={(content) => { this.setState({ content }) }}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.publish;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'publish/query',
        payload: params,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
