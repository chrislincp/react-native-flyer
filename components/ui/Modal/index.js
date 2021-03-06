import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  BackHandler,
  StyleSheet,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { Themes } from '../../uitls';

export default class Modal extends React.Component {
  static defaultProps = {
    visible: false,
    animationType: 'alert',
    animationDuration: 200,
    maskClosable: true,
    animateWhenMount: false,
    springEffect: false,
    onClose: () => {},
    style: {},
    bodyStyle: {},
    maskStyle: {},
    children: null,
    onAnimationEnd: () => {},
    offset: 0,
  }

  static propTypes = {
    // 是否可见
    visible: PropTypes.bool,
    // 动画类型：none(没有)| fade（渐隐渐显）| slide（从底部出现）| slide-down（从顶部出现）| scale(放缩) | fade_scale(渐隐渐现放缩)|alert(弹窗)
    animationType: PropTypes.oneOf([
      'none',
      'fade',
      'slide',
      'slide-down',
      'slide-left',
      'slide-right',
      'scale',
      'fade-scale',
      'alert',
    ]),
    // 动画时长
    animationDuration: PropTypes.number,
    // 点击遮罩是否可关闭
    maskClosable: PropTypes.bool,
    // 首次加载动画
    animateWhenMount: PropTypes.bool,
    // 是否有弹簧效果
    springEffect: PropTypes.bool,
    // 关闭回调
    onClose: PropTypes.func,
    // 动画结束回调
    onAnimationEnd: PropTypes.func,
    style: PropTypes.any,
    maskStyle: PropTypes.any,
    bodyStyle: PropTypes.any,
    children: PropTypes.node,
    offset: PropTypes.number,
  }


  static show = (opt = {}) => {
    if (this._modal) {
      this._modal.destroy();
      this._modal = null;
    }

    this._modal = new RootSiblings(<Modal {...opt} visible animateWhenMount />);
  }

  static hide = (opt = {}) => {
    if (!this._modal) return;
    this._modal.update(<Modal {...opt} visible={false} animateWhenMount />);
  }

  constructor(props) {
    super(props);
    const { visible } = this.props;
    this.state = {
      position: new Animated.Value(this._getPosition(visible)),
      scale: new Animated.Value(this._getScale(visible)),
      opacity: new Animated.Value(this._getOpacity(visible)),
      modalVisible: visible,
    };
  }

  /**
   * lifecycle
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.modalVisible !== nextProps.visible) {
      return {
        modalVisible: true,
      };
    }
    return null;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.visible !== nextProps.visible) {
  //     return true;
  //   }
  //   if (nextState) {
  //     if (nextState.modalVisible !== this.state.modalVisible) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  componentDidMount() {
    const { visible, animateWhenMount, animationType } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
    if (visible && animateWhenMount && animationType !== 'none') {
      this._animateDialog(visible);
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this._animateDialog(visible);
    }
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton = () => {
    const { modalVisible } = this.state;
    if (modalVisible) {
      this._maskClose();
      return true;
    }
    return false;
  }

  /**
   * 点击遮罩关闭
   *
   * @memberof Modal
   */
  _maskClose = () => {
    const { maskClosable, onClose } = this.props;
    if (maskClosable && onClose) {
      onClose();
    }
  }

  /**
   * 动画结束回调
   *
   * @memberof Modal
   */
  _onAnimationEnd = (visible) => {
    const { onAnimationEnd } = this.props;
    if (onAnimationEnd) {
      onAnimationEnd(visible);
    }
  }

  /**
   * 数据处理区
   *
   * @memberof Modal
   */
  _getPosition = (visible) => {
    const { animationType, offset } = this.props;
    if (visible) {
      return 0;
    }
    let position;
    switch (animationType) {
      case 'slide-down':
        position = -Themes.screenHeight + offset;
        break;
      case 'slide-left':
        position = -Themes.screenWidth + offset;
        break;
      case 'slide-right':
        position = Themes.screenWidth + offset;
        break;
      default:
        position = Themes.screenHeight + offset;
        break;
    }
    return position;
  }

  _getAlertScale = visible => (visible ? 1 : 1.2)

  _getScale = visible => (visible ? 1 : 0)

  _getOpacity = visible => (visible ? 1 : 0)

  /**
   * 动画部分
   *
   * @memberof Modal
   */
  _animateDialog(visible) {
    const { animationType, animationDuration, springEffect } = this.props;
    const { position, scale, opacity } = this.state;
    opacity.setValue(this._getOpacity(visible));
    this._stopDialogAnim();

    if (animationType === 'none') {
      opacity.setValue(this._getOpacity(visible));
      this.setState({
        modalVisible: visible,
      });
    } else {
      this._animateMask(visible);
      switch (animationType) {
        case 'slide':
        case 'slide-down':
          position.setValue(this._getPosition(!visible));
          this.animDialog = Animated.timing(position, {
            toValue: this._getPosition(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;
        case 'slide-left':
          position.setValue(this._getPosition(!visible));
          this.animDialog = Animated.timing(position, {
            toValue: this._getPosition(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;
        case 'slide-right':
          position.setValue(this._getPosition(!visible));
          this.animDialog = Animated.timing(position, {
            toValue: this._getPosition(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;

        case 'fade':
          this.animDialog = Animated.timing(opacity, {
            toValue: this._getOpacity(visible),
            duration: animationDuration,
          });
          break;

        case 'scale':
          scale.setValue(this._getScale(!visible));
          this.animDialog = Animated.timing(scale, {
            toValue: this._getScale(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;

        case 'fade-scale':
          scale.setValue(this._getScale(!visible));
          this.animDialog = Animated.parallel([
            Animated.timing(opacity, {
              toValue: this._getOpacity(visible),
              duration: animationDuration,
            }),
            Animated.timing(scale, {
              toValue: this._getScale(visible),
              duration: animationDuration,
              easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
            }),
          ]);
          break;

        case 'alert':
          if (visible) {
            scale.setValue(this._getAlertScale(!visible));
            this.animDialog = Animated.parallel([
              Animated.timing(opacity, {
                toValue: this._getOpacity(visible),
                duration: animationDuration,
              }),
              Animated.timing(scale, {
                toValue: this._getAlertScale(visible),
                duration: animationDuration,
                easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
              }),
            ]);
          } else {
            this.animDialog = Animated.timing(opacity, {
              toValue: this._getOpacity(visible),
              duration: animationDuration,
            });
          }
          break;

        default:
          break;
      }
      this.animDialog.start(() => {
        this.animDialog = null;
        if (!visible) {
          this.setState({
            modalVisible: false,
          });
        }
        this._onAnimationEnd(visible);
      });
    }
  }

  _animateMask(visible) {
    const { animationDuration } = this.props;
    const { opacity } = this.state;
    this._stopMaskAnim();

    opacity.setValue(this._getOpacity(!visible));
    this.animMask = Animated.timing(opacity, {
      toValue: this._getOpacity(visible),
      duration: animationDuration,
    });
    this.animMask.start(() => {
      this.animMask = null;
    });
  }

  _stopDialogAnim() {
    if (this.animDialog) {
      this.animDialog.stop();
      this.animDialog = null;
    }
  }

  _stopMaskAnim() {
    if (this.animMask) {
      this.animMask.stop();
      this.animMask = null;
    }
  }

  /**
   * 渲染区
   *
   * @memberof Modal
   */
  render() {
    const {
      position, scale, opacity, modalVisible,
    } = this.state;
    const {
      children, animationType, maskStyle, style, bodyStyle, offset,
    } = this.props;
    if (!modalVisible) {
      return null;
    }
    const animationStyleMap = {
      none: {},
      slide: { transform: [{ translateY: position }] },
      'slide-down': { transform: [{ translateY: position }] },
      'slide-left': { transform: [{ translateX: position }] },
      'slide-right': { transform: [{ translateX: position }] },
      fade: { opacity },
      scale: { transform: [{ scale }] },
      'fade-scale': { transform: [{ scale }], opacity },
      alert: { transform: [{ scale }], opacity },
    };

    const positionStyleMap = {
      'slide-down': { top: offset },
      'slide-left': { left: offset },
      'slide-right': { right: offset },
      slide: { bottom: offset },
    };

    return (
      <View style={[styles.container, styles.absolute, positionStyleMap[animationType], style]}>
        <TouchableWithoutFeedback onPress={this._maskClose}>
          <Animated.View style={[styles.absolute, styles.mask, { opacity }, maskStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.body, animationStyleMap[animationType], bodyStyle]}>
          {children}
        </Animated.View>
      </View>
    );
  }
}

// 基础样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: 'rgba(4, 4, 12, 0.8)',
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  body: {
    // backgroundColor: '#FFF',
    zIndex: 90,
  },
});
