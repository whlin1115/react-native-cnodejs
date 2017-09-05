import React, { PureComponent } from 'react'
import { connect } from 'dva/mobile'
import { Title, Option, Content } from './components'
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
    const { topic_id, navigation } = this.props;
    if (next.topic_id && next.topic_id !== topic_id) {
      this.props.setTopic(next.topic_id)
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
  return { topic_id, loading }
}

function mapDispatchToProps(dispatch) {
  return {
    setContent(params) {
      dispatch({
        type: 'publish/content',
        payload: params,
      })
    },
    setTopic(params) {
      dispatch({
        type: 'detail/topic',
        payload: params,
      })
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
