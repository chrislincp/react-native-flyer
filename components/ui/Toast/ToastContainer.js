import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Animated, Image, StyleSheet,
} from 'react-native';
import { MaterialIndicator } from '../ActivityIndicator';

export default class ToastConatiner extends React.Component {
  static defaultProps = {
    duration: 2,
    mask: false,
    modal: false,
    offsetY: '-15%',
    content: '',
    onClose: () => {},
    type: '',
    onAnimationEnd: () => {},
  }

  static propTypes = {
    // Toast内容
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    // 延时
    duration: PropTypes.number,
    // 关闭回调
    onClose: PropTypes.func,
    // 是否显示遮罩
    mask: PropTypes.bool,
    // 是否阻止用户点击
    modal: PropTypes.bool,
    // Toast类型
    type: PropTypes.string,
    // Y轴偏移量
    offsetY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // 动画结束
    onAnimationEnd: PropTypes.func,
  }

  static simpleStyleProps = {
    backgroundColor: {
      name: 'inner',
      attr: 'backgroundColor',
    },
    borderRadius: {
      name: 'inner',
      attr: 'borderRadius',
    },
  }

  anim = '';

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {
      onClose,
      duration,
      onAnimationEnd,
    } = this.props;
    const { timing } = Animated;
    const { fadeAnim } = this.state;
    if (this.anim) {
      this.anim = null;
    }
    const animArr = [
      timing(fadeAnim, {
        toValue: 1,
        duration: 200,
      }),
      Animated.delay(duration * 1000),
    ];
    if (duration > 0) {
      animArr.push(timing(fadeAnim, {
        toValue: 0,
        duration: 200,
      }));
    }
    this.anim = Animated.sequence(animArr);
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null;
        if (onClose) {
          onClose();
        }
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.anim) {
      this.anim.stop();
      this.anim = null;
    }
  }

  render() {
    const {
      type = '', content, mask, modal, offsetY,
    } = this.props;
    let iconDom = null;
    let contentDom = content;
    switch (type) {
      case 'loading':
        iconDom = (
          <MaterialIndicator color="white" style={[styles.centering]} />
        );
        break;
      case 'success':
        iconDom = (
          <View style={[styles.centering]}>
            <Image source={require('./images/Success.png')} style={[{ width: 30, height: 30 }]} />
          </View>
        );
        break;
      case 'fail':
        iconDom = (
          <View style={[styles.centering]}>
            <Image source={require('./images/Fail.png')} style={[{ width: 30, height: 30 }]} />
          </View>
        );
        break;
      default:
        break;
    }
    const status = ['loading', 'success', 'fail'];
    if (typeof contentDom === 'string') {
      contentDom = (
        <Text style={[styles.text, status.includes(type) && styles.textWithIcon]}>
          {contentDom}
        </Text>
      );
    }
    return (
      <Animated.View
        style={
          [styles.container, mask ? styles.mask : null, {
            top: offsetY,
            opacity: this.state.fadeAnim,
          }]
        }
        pointerEvents={modal ? 'auto' : 'box-none'}
      >
        <View style={[styles.inner, iconDom ? styles.innerWithIcon : {}]}>
          {iconDom}
          {contentDom}
        </View>
      </Animated.View>
    );
  }
}

// 基础样式
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    color: '#FFF',
    fontSize: 14,
  },
  textWithIcon: {
    fontWeight: '600',
    marginBottom: 3,
  },
  inner: {
    minWidth: 104,
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'rgba(4, 4, 12, 0.8)',
  },
  innerWithIcon: {
    borderRadius: 9,
    padding: 10,
    height: 104,
  },
  icon: {
    color: '#FFF',
    fontSize: 34,
    paddingBottom: 6,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
  },
});
