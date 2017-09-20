
import React, { Component, PureComponent } from 'react'
import { connect } from 'dva/mobile';
import { StyleSheet, View, Image, Text, Modal, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { HtmlView } from '../../../components';

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20
const defaultWidth = width - 50 * 2

class Floor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  _onSelect = () => {
    this.setState({ visible: false })
  }

  _onUps = (reply_id) => {
    const { accesstoken } = this.props
    const params = { reply_id, accesstoken }
    this.props.ups(params)
  }

  render() {
    const { item, navigate } = this.props

    return (
      <View tyle={styles.container}>
        <TouchableOpacity onPress={() => { this.setState({ visible: true }) }}>
          <View style={styles.list}>
            <View style={styles.user}>
              <TouchableOpacity onPress={() => { navigate('Center', { user: item.author.loginname }) }}>
                <Image source={{ uri: item.author.avatar_url }} style={styles.head} />
              </TouchableOpacity>
              <View style={styles.info}>
                <View style={styles.cl}>
                  <Text style={styles.name}>{item.author.loginname}</Text>
                  <Text style={styles.name}>{item.create_at}</Text>
                </View>
                <View style={styles.cr}>
                  <Text style={styles.ups}>{item.ups.length}</Text>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => { this._onUps(item.id) }}>
                    <Image style={styles.icon} source={item.is_uped ? require('../../../assets/images/liked.png') : require('../../../assets/images/like.png')} resizeMode='contain' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <HtmlView html={item.content} styles={htmlStyles} />
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.visible}
        >
          <TouchableWithoutFeedback onPress={() => { this.setState({ visible: false }) }}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <TouchableOpacity onPress={() => { this._onSelect() }}>
                  <View style={styles.rowView}>
                    <Text style={styles.rowText}>评论</Text>
                  </View>
                  <View style={styles.rowLine}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this._onSelect() }}>
                  <View style={styles.rowView}>
                    <Text style={styles.rowText}>复制</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { accesstoken } = state.home
  const { replies } = state.detail;
  return { accesstoken, replies };
}

function mapDispatchToProps(dispatch) {
  return {
    ups(params) {
      dispatch({
        type: 'detail/ups',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0'
  },

  user: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
  },

  head: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  cl: {
    flex: 1,
  },

  name: {
    color: '#626262',
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },

  cr: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconBtn: {
    padding: 10
  },

  icon: {
    width: 20,
    height: 20,
  },

  content: {
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },

  ups: {
    fontSize: 14,
    color: '#626262',
    paddingTop: 3,
    paddingBottom: 3,
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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


const htmlStyles = StyleSheet.create({
  a: {
    color: '#4078c0',
  },

  p: {
    fontSize: 14,
    lineHeight: 18,
  },

  img: {
    width: defaultMaxImageWidth
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Floor);
