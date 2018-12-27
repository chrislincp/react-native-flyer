/**
 * 活动指示器
 * @author esky
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Indicator from './indicator';
import BarIndicator from './BarIndicator';
import BallIndicator from './BallIndicator';
import DotIndicator from './DotIndicator';
import MaterialIndicator from './MaterialIndicator';
import PacmanIndicator from './PacmanIndicator';
import PulseIndicator from './PulseIndicator';
import SkypeIndicator from './SkypeIndicator';
import NativeIndicator from './NativeIndicator';
import WaveIndicator from './WaveIndicator';

export default class FEGOActivityIndicator extends React.Component {
  static defaultProps = {
    visible: true,
    color: '#999',
    size: 'small',
  };

  static propTypes = {
    // 显示
    visible: PropTypes.bool,
    // 指示器颜色
    color: PropTypes.string,
    // 指示器尺寸
    size: PropTypes.oneOf(['large', 'small']),
    // 指示器文案
    text: PropTypes.string,
  }

  static baseStyle = {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#999',
      backgroundColor: 'transparent',
      fontSize: 14,
      marginLeft: 8,
    },
  }

  _renderSpinner() {
    const { style } = this;
    return (
      <View style={style.container}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
        />
        {this.props.text && (<Text style={style.text}>{this.props.text}</Text>)}
      </View>
    );
  }

  render() {
    if (this.props.visible) {
      return this._renderSpinner();
    }
    return null;
  }
}

export {
  Indicator,
  BarIndicator,
  BallIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  NativeIndicator,
  WaveIndicator,
};
