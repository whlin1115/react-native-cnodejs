
import React from 'react'
import { connect } from 'dva/mobile'
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native'

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  render() {
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.history}>
        <View style={styles.hots}>
          <TouchableOpacity style={styles.hotsBtn}>
            <Text style={styles.hotsText}>NodeJs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hotsBtn}>
            <Text style={styles.hotsText}>NodeJs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hotsBtn}>
            <Text style={styles.hotsText}>NodeJs</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.records}>
          <FlatList
            style={{ width: width }}
            data={data}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <Card navigate={navigate} item={item} />}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.search;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'search/query',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  history:{

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
