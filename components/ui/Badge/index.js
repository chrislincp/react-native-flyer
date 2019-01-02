import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';


export default class Badge extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['dot-border', 'normal']),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textStyle: Text.propTypes.style,
    max: PropTypes.number,
  }

  static defaultProps = {
    type: 'normal',
    text: '',
    textStyle: {},
    max: 99,
  }

  buildProps() {
    let {
      style, type, text, textStyle, max, children, ...others
    } = this.props;
    let width = text ? 18 : 7;
    if (text > 99) {
      width = 32;
    } else if (text > 9) {
      width = 25;
    }

    let height = text ? 18 : 7;
    let borderRadius = text ? 18 : 7;
    let borderColor = 'transparent';
    let borderWidth = 0;
    if (type === 'dot-border') {
      width = 10;
      height = 10;
      borderRadius = 5;
      borderColor = 'white';
      borderWidth = 2;
    }
    style = [{
      backgroundColor: '#FF3366',
      width,
      height,
      borderRadius,
      borderColor,
      borderWidth,
      paddingBottom: type === 'square' ? 2 : 0,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);

    if (!text) {
      children = null;
    } else {
      textStyle = [{
        color: '#ffffff',
        fontSize: 12,
      }].concat(textStyle);
      if (text > max) {
        text = `${max}+`;
      }
      children = (
        <Text type="bold" style={textStyle} allowFontScaling={false}>
          {text}
        </Text>
      );
    }

    this.props = {
      style, type, text, textStyle, max, children, ...others,
    };
  }

  render() {
    this.buildProps();
    return <View {...this.props} />;
  }
}
