import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import Sizes from '../../uitls/Sizes';
import { ifAndroid, ifIphoneX } from '../../uitls/Utils';

top = 0;
class Header extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['back', 'close']),
    height: PropTypes.number,
  }

  static defaultProps = {
    type: 'back',
    statusBar: 'light-content',
    height: 44,
  }

  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
    this.state = {
      title: props.translucent ? '' : this.props.title,
      fontColor: 'black',
    };
  }

  /**
   * 设置颜色和透明度
   * @param color
   */
  static setColorAndBackgroundColor({ color, transparent }) {
    StatusBar.setBackgroundColor(color);
    if (transparent) {
      top = ifAndroid(StatusBar.currentHeight, 0);
      StatusBar.setTranslucent(transparent);
    }
  }

  setOpacity = (value) => {
    const { title } = this.state;
    this.opacity.setValue(value);
    // const opacity = this.opacity._value > 100 ? 1 : this.opacity._value / 100
    // this.setState({
    //   title: this.props.title,
    //   fontColor: `rgba(0, 0, 0, ${opacity})`,
    // })
  }

  render() {
    const {
      type,
      left,
      leftPress,
      title,
      right,
      style,
      leftStyle,
      rightStyle,
      centerStyle,
      backgroundColor,
      position,
      height,
    } = this.props;
    let paddingTop = top;
    // if (position && position == 'absolute') {
    paddingTop = ifAndroid(StatusBar.currentHeight, ifIphoneX(44, 24));
    // }
    const leftComponent = left || (
      <TouchableOpacity
        style={{ padding: 18 }}
        onPress={leftPress}
      >
        <Image
          source={type === 'back' ? require('../../images/back.png') : require('../../images/close_dark.png')}
          style={{ width: 22, height: 22 }}
        />
      </TouchableOpacity>
    );

    const centerComponent = typeof this.props.title === 'string' ? (
      <Text
        style={[styles.title, { color: this.state.fontColor }]}
      >
        {title}
      </Text>
    ) : (
      title
    );

    const rightComponent = right || null;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.translucent ? 'transparent' : this.props.backgroundColor || 'white',
          }, { paddingTop, height: height + paddingTop },
          style,
        ]}
      >
        {this.props.translucent && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: -1,
                width: Sizes.screenWidth,
                backgroundColor: this.props.backgroundColor || 'white',
              },
              {
                opacity: this.opacity.interpolate({
                  inputRange: [10, 170],
                  outputRange: [0, 1],
                }),
              },
            ]}
          />
        )}
        <View style={[styles.left, leftStyle]}>{leftComponent}</View>
        <Animated.View style={[styles.center, centerStyle, {
          opacity: this.props.translucent ? this.opacity.interpolate({
            inputRange: [10, 170],
            outputRange: [0, 1],
          }) : 1,
        }]}
        >
          {centerComponent}
        </Animated.View>
        <View style={[styles.right, rightStyle]}>{rightComponent}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Sizes.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#2F2F36',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Header;
