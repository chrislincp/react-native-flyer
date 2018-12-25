/**
 * 按钮
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Themes } from '../../uitls';


export default class Button extends React.Component {
  static defaultProps = {
    disabled: false,
    circle: false,
    onPress: () => {},
    type: 'primary',
    title: '',
    color: Themes.themeColor,
    titleStyle: null,
    style: null,
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabled: PropTypes.bool,
    circle: PropTypes.bool,
    onPress: PropTypes.func,
    color: PropTypes.string,
    titleStyle: PropTypes.any,
    style: PropTypes.any,
    type: PropTypes.oneOf(['border', 'primary']),
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title, disabled, circle, onPress, color, titleStyle, type, style,
    } = this.props;
    const children = typeof title === 'string' ? <Text style={[styles.title, titleStyle, type === 'border' && { color: Themes.themeColor }]}>{title}</Text> : title;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          circle && styles.circle,
          { backgroundColor: color || Themes.themeColor },
          type === 'border' && { backgroundColor: 'white', borderWidth: 1, borderColor: Themes.themeColor },
          style,
        ]}
        onPress={() => onPress()}
      >
        <View style={disabled && styles.disabled}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  title: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  circle: {
    borderRadius: 45,
  },
  disabled: {
    opacity: 0.5,
    // borderColor: '#CCC',
    // backgroundColor: '#EEE',
  },
});
