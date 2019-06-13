import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RootSiblings from 'react-native-root-siblings';
import Modal from '../Modal';
import { Themes } from '../../uitls';
// import { Themes } from '../../themes'
export default class Popup extends React.Component {
  static propTypes = {
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    offset: PropTypes.number,
    visible: PropTypes.bool,
    // animateWhenMount: PropTypes.bool,
    onClose: PropTypes.func,
    style: PropTypes.any,
    children: PropTypes.any,
  }

  static defaultProps = {
    position: 'bottom',
    offset: 0,
    visible: false,
    // animateWhenMount: true,
    onClose: null,
    style: null,
    children: null,
  }


  static show = (opt = {}) => {
    if (this._popup) {
      this._popup.destroy();
      this._popup = null;
    }
    const { onClose, ...props } = opt;

    this._popupOpt = opt; //  保存当前props

    this._popup = new RootSiblings(
      (
        <Popup
          visible
          {...props}
          onClose={() => {
            Popup.hide(opt);
            if (onClose) onClose();
          }}
        />
      ),
    );
  }

  static update = (opt = {}) => {
    if (!this._popup) return;
    const hideOpt = opt || this._popupOpt || {};
    const { onClose, ...props } = hideOpt;
    this._popup.update(
      <Popup
        {...props}
        visible
        onClose={() => {
          Popup.hide(opt);
          if (onClose) onClose();
        }}
      />,
    );
  }

  static hide = (opt) => {
    if (!this._popup) return;
    const hideOpt = opt || this._popupOpt || {};
    this._popup.update(<Popup visible={false} {...hideOpt} />);
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      type: this._getAnimationType(props.position),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible, type: this._getAnimationType(props.position) });
  }

  _getAnimationType(type) {
    let animationType = '';

    switch (type) {
      case 'top':
        animationType = 'slide-down';
        break;
      case 'bottom':
        animationType = 'slide';
        break;
      case 'left':
        animationType = 'slide-left';
        break;
      case 'right':
        animationType = 'slide-right';
        break;
      default:
        break;
    }
    return animationType;
  }

  _onClose() {
    const { onClose } = this.props;
    if (onClose) onClose();
  }

  render() {
    const {
      children, style, offset, position,
    } = this.props;
    const { visible, type } = this.state;
    const modalStyleMap = {
      top: { justifyContent: 'flex-start' },
      bottom: { justifyContent: 'flex-end' },
      left: { flexDirection: 'row', justifyContent: 'flex-start' },
      right: { flexDirection: 'row', justifyContent: 'flex-end' },
    };
    const styleMap = {
      top: {
        width: Themes.screenWidth,
        height: 300,
      },
      bottom: {
        width: Themes.screenWidth,
        height: 300,
      },
      left: {
        width: Themes.screenWidth / 2,
        height: Themes.screenHeight,
      },
      right: {
        width: Themes.screenWidth / 2,
        height: Themes.screenHeight,
      },
    };
    return (
      <Modal
        visible={visible}
        animationType={type}
        offset={offset}
        style={[modalStyleMap[position]]}
        animateWhenMount
        onClose={() => this._onClose()}
      >
        <View style={[styles.content, styleMap[position], style]}>{children}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
  },
});
