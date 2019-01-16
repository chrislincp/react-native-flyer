import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageSource from './ImageSource';
import { Themes } from '../../uitls';

export default class ErrorPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    buttonText: PropTypes.string,
    onPress: PropTypes.func,
    source: PropTypes.number,
    noButton: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.oneOf(['empty', 'error', 'netError']),
  }

  static defaultProps = {
    title: '',
    buttonText: '轻点刷新',
    source: 0,
    onPress: () => {},
    noButton: false,
    style: {},
    type: '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      source, type, title, onPress, buttonText, noButton, style,
    } = this.props;
    let img;
    switch (type) {
      case 'error':
        img = ImageSource.serverErrorImg;
        break;
      case 'netError':
        img = ImageSource.netErrorImg;
        break;
      case 'empty':
        img = ImageSource.noDataImg;
        break;
      default:
        break;
    }
    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: '15%',
            backgroundColor: 'white',
            height: '100%',
          },
          style,
        ]}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={{ width: 70, height: 70 }} source={img || source} />
          <Text
            style={{
              textAlign: 'center',
              color: '#B8BEC8',
              fontSize: 16,
              lineHeight: 18,
            }}
          >
            {title}
          </Text>
          {!noButton ? (
            <TouchableOpacity
              style={{
                width: 100,
                lineHeight: 18,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}
              onPress={() => onPress()}
            >
              <Text style={{ fontSize: 14, color: Themes.themeColor }}>{buttonText}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
