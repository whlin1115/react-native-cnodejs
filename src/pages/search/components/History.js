import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const { height } = Dimensions.get('window')

class History extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  _onSearch = (text) => {
    const params = { content: text }
    this.props.query(params)
  }

  _onDelet = (text) => {
    const { records } = this.props
    const datas = records.filter(history => history !== text);
    this.props.delet(datas);
  }

  render() {
    const hosts = ['NodeJs', 'Web', 'ReactJs', 'Vuejs', 'Mysql', 'JavaScript', 'Express', 'ES6']
    const { records, visible, loading } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.hots}>
          <View style={styles.titleView}>
            <Text style={styles.title}>热门搜索</Text>
          </View>
          <View style={styles.hotsRow}>
            {
              hosts.map((host, index) => (
                <TouchableOpacity key={index} style={styles.hotsBtn} onPress={() => { this._onSearch(host) }}>
                  <Text style={styles.hotsText}>{host}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        {
          records.length > 0 ?
            <View style={styles.records}>
              <View style={styles.titleView}>
                <Text style={styles.title}>搜索记录</Text>
              </View>
              {
                records.map((record, index) => (
                  <TouchableOpacity key={index} style={styles.recordRow} onPress={() => { this._onSearch(record) }}>
                    <View style={styles.left}>
                      <Image style={styles.icon} source={require('../../../assets/images/history.png')} resizeMode='contain' />
                      <Text style={styles.recordText}>{record}</Text>
                    </View>
                    <TouchableOpacity key={index} style={styles.delet} onPress={() => { this._onDelet(record) }}>
                      <Image style={styles.icon} source={require('../../../assets/images/close.png')} resizeMode='contain' />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              }
            </View> : null
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { records, loading } = state.search;
  return { records, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    init() {
      dispatch({
        type: 'search/init',
      });
    },
    query(params) {
      dispatch({
        type: 'search/query',
        payload: params,
      });
    },
    delet(params) {
      dispatch({
        type: 'search/records',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },

  hots: {
    marginLeft: 15,
    marginTop: 15,
  },

  titleView: {
    marginBottom: 15,
  },

  title: {
    color: '#999999',
    fontSize: 12,
  },

  hotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  hotsBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 3,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#7A86A2',
  },

  hotsText: {
    color: '#FFFFFF',
  },

  records: {
    marginLeft: 15,
    marginRight: 15,
  },

  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: '#eee',
    paddingTop: 15,
    paddingBottom: 15,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  icon: {
    width: 20,
    height: 20,
    marginLeft: 6,
    marginRight: 12,
  },

  recordText: {
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(History);