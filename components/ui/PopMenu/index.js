import React from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import RootSiblings from 'react-native-root-siblings';
import Modal from '../Modal';
import { Themes } from '../../uitls';
import { ifAndroid } from '../../uitls/Utils';

export default class PopMenu extends React.Component {
  static defaultProps = {
    position: 'left',
    offsetX: 0,
    offsetY: 0,
    data: [],
    config: { label: 'label', value: 'value' },
    onChange: () => {},
    value: '',
  }

  static propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    data: PropTypes.array,
    config: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.ModalWidth = 112;
    this.state = {
      w: '',
      h: '',
    };
  }

  onPress(e) {
    const { w, h } = this.state;
    const { position, offsetX, offsetY } = this.props;
    const {
      pageX, pageY, locationX, locationY,
    } = e.nativeEvent;
    console.log(e, e.nativeEvent);
    let x;
    let y;
    switch (position) {
      case 'left':
        x = pageX - locationX;
        // y = pageY - locationY - ifAndroid(StatusBar.currentHeight, 0) + h + 10;
        y = pageY - locationY - 0 + h + 10;
        break;
      case 'right':
        x = pageX - locationX - this.ModalWidth + w;
        // y = pageY - locationY - ifAndroid(StatusBar.currentHeight, 0) + h + 10;
        y = pageY - locationY - 0 + h + 10;
        break;
      default:
        break;
    }
    if (this._modal) {
      this._modal.destroy();
      this._modal = null;
    }
    this._modal = new RootSiblings((
      <Modal
        maskStyle={{ opacity: ifAndroid(0.6, 0) }}
        contentStyle={{
          width: this.ModalWidth,
          position: 'absolute',
          top: y + offsetY,
          left: x + offsetX,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 4,
          shadowOffset: { w: 0, h: 3 },
        }}
        animateWhenMount
        visible
        onClose={() => {
          this._modal.destroy();
          this._modal = null;
        }}
      >
        {this.renderContent(x, y)}
      </Modal>
    ));
  }

  onLayout(e) {
    const { height, width } = e.nativeEvent.layout;
    this.setState({ w: width, h: height });
  }

  onChange(item, index) {
    console.log('onchange', item, index);
    const { onChange } = this.props;
    this._modal.destroy();
    onChange(item, index);
  }


  renderContent() {
    const {
      position, data, config, value,
    } = this.props;
    return (
      <View>
        <View style={[styles.arrow, { marginLeft: position === 'left' ? 15 : this.ModalWidth - 15 - 12 }]} />
        <View
          style={{
            borderRadius: 8,
            backgroundColor: 'white',

          }}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => this.onChange(item, index)}
              key={index}
              style={{
                height: 50,
                borderBottomWidth: index + 1 === data.length ? 0 : 1,
                borderColor: '#ECEDF4',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={item[config.value] === value && { color: Themes.themeColor }}>{item[config.label]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  render() {
    const { children, style } = this.props;
    return (
      <TouchableOpacity style={style} onPress={e => this.onPress(e)} onLayout={e => this.onLayout(e)}>
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 1,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: 6,
    borderColor: 'transparent',
    borderBottomColor: 'white', // 上箭头颜色
  },
});
