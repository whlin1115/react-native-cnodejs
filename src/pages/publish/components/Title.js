import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, Modal, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');
const defaultWidth = width - 90 * 2

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  componentDidMount() {
    const { title = '' } = this.props.data
    this.props.setTitle(title)
  }

  _onSelect = (tab) => {
    this.props.setTab(tab)
    this.setState({ visible: false })
  }

  render() {
    const { tab, title } = this.props
    const tabs = [{ key: 'ask', value: '问答' }, { key: 'share', value: '分享' }, { key: 'dev', value: '测试' }]
    const tabDefault = { 'ask': '问答', 'share': '分享', 'dev': '测试' }

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <TextInput style={styles.input}
            value={title}
            placeholder='输入标题'
            underlineColorAndroid="transparent"
            onChangeText={(title) => { this.props.setTitle(title) }}
          />
          <TouchableOpacity onPress={() => { this.setState({ visible: true }) }}>
            <View style={styles.tabView}>
              <Text>{tabDefault[tab]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => { console.log('modal is closed') }}
        >
          <TouchableWithoutFeedback onPress={() => { this.setState({ visible: false }) }}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                {
                  tabs.map((tab, index) => (
                    <TouchableOpacity key={index} onPress={() => { this._onSelect(tab.key) }}>
                      <View style={styles.rowView}>
                        <Text style={styles.rowText}>{tab.value}</Text>
                      </View>
                      {index != tabs.length - 1 ? <View style={styles.rowLine}></View> : null}
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { tab, title } = state.publish;
  const { data } = state.detail;
  return { tab, title, data };
}

function mapDispatchToProps(dispatch) {
  return {
    setTab(params) {
      dispatch({
        type: 'publish/tab',
        payload: params,
      });
    },
    setTitle(params) {
      dispatch({
        type: 'publish/title',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  titleView: {
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    flex: 8,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  tabView: {
    flex: 2,
    margin: 3,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  modal: {
    width: defaultWidth,
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },

  rowView: {
    padding: 16,
  },

  rowLine: {
    height: 0.5,
    backgroundColor: '#F0F0F0',
  },

  rowText: {
    textAlign: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);