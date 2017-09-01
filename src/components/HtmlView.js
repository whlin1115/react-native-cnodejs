import React from 'react';
import { View } from 'react-native';
import HTMLView from 'react-native-htmlview';

class HtmlView extends React.Component {
  render() {
    const { html, styles } = this.props;

    const _renderNode = function (node, index, siblings, parent, defaultRenderer) {
      if (node.name == 'img') {
        const name = node.name
        return null
      }
    }

    return (
      <HTMLView
        value={html}
        stylesheet={styles}
        renderNode={_renderNode}
      />
    );
  }
}

export default HtmlView