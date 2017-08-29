import React, { Component } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import HtmlRender from 'react-native-html-render'

class Html extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { html } = this.props;
    const sample = "<H5>Hello World</H5>";

    return (
      html ?
        <HtmlRender
          value={sample}
          stylesheet={styles}
        /> : null
    )
  }
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100
  }
})

export default Html