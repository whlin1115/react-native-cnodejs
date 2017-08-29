import React from 'react';
import { View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

class HtmlView extends React.Component {
  render() {
    const { html, styles = {
      a: {
        color: '#4078c0',
      },
    } } = this.props;

    return (
      <HTMLView
        value={html}
        stylesheet={styles}
      />
    );
  }
}

export default HtmlView