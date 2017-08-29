import React from 'react';
import { View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

class HtmlView extends React.Component {
  render() {
    const { html, styles } = this.props;

    return (
      <HTMLView
        value={html}
        stylesheet={styles}
      />
    );
  }
}

export default HtmlView