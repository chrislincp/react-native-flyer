import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

class BottomTabBar extends Component {
  static defaultProps = {
    title: '',
    imageSource: null,
    tintColor: null,
    textStyle: null,
  }

  static propTypes = {
    title: PropTypes.any,
    imageSource: PropTypes.any,
    tintColor: PropTypes.any,
    textStyle: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {
      title, imageSource, tintColor, textStyle,
    } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imageSource ? <Image source={imageSource} style={{ width: 24, height: 24 }} /> : null}
        <Text
          style={[{
            color: tintColor, textAlign: 'center', fontSize: 10, marginTop: 4,
          }, textStyle]}
        >
          {title}
        </Text>
      </View>
    );
  }
}

export default BottomTabBar;
