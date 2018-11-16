/**
 * Local image with auto-resolved height
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View, ViewPropTypes } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

export default class extends PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    source: PropTypes.number.isRequired,
  };

  static defaultProps = {
    containerStyle: [],
  };

  state = {
    height: 0,
    width: 0,
  };

  render() {
    let containerStyles = this.props.containerStyle;
    if (this.state.height > 0) {
      containerStyles = [containerStyles, { height: this.state.height }];
    }

    return (
      <View onLayout={this.onContainerLayout} style={containerStyles}>
        <Image
          {...this.props}
          style={[this.props.style, { width: this.state.width, height: this.state.height }]}
        />
      </View>
    );
  }

  onContainerLayout = event => {
    const containerWidth = event.nativeEvent.layout.width;
    const { width, height } = resolveAssetSource(this.props.source);

    this.setState({
      width: containerWidth,
      height: containerWidth / (width / height),
    });
  };
}
