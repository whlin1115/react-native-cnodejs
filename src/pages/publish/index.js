import React, { PureComponent } from 'react'
import { connect } from 'dva/mobile'
import Title from './components/Title'
import Option from './components/Option'
import Content from './components/Content'
import { StyleSheet, View, ScrollView, Text, TextInput, Image, Modal, StatusBar, Dimensions, TouchableOpacity } from 'react-native'

class Publish extends PureComponent {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation
    const { edit } = state.params ? state.params : {}
    return {
      headerTitle: edit ? '编辑话题' : '新建话题',
      headerRight: (<Option edit={edit} />),
    }
  }

  componentWillReceiveProps(next) {
    const { topic_id, navigation, accesstoken } = this.props;
    if (next.topic_id && next.topic_id !== topic_id) {
      this.props.query({ topic_id: next.topic_id, accesstoken })
      navigation.goBack()
    }
  }

  componentWillUnmount() {
    this.props.clean()
  }

  render() {
    const { loading } = this.props
    const { params } = this.props.navigation.state

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Title />
        <Content />
      </ScrollView >
    )
  }
}

function mapStateToProps(state) {
  const { topic_id, loading } = state.publish
  const { accesstoken } = state.zone
  return { topic_id, loading, accesstoken }
}

function mapDispatchToProps(dispatch) {
  return {
    setContent(params) {
      dispatch({
        type: 'publish/content',
        payload: params,
      })
    },
    query(params) {
      dispatch({
        type: 'detail/query',
        payload: params,
      });
    },
    clean() {
      dispatch({
        type: 'publish/clean',
      })
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Publish)
