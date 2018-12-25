/**
 * 对话框
 * 含标题，按钮区等
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Modal from '../Modal';
import { Themes } from '../../uitls';

export default class Dialog extends React.Component {
  static defaultProps = {
    visible: false,
    maskClosable: false,
    animationType: 'fade-scale',
    animateWhenMount: true,
    title: '',
    content: '',
    okText: '确定',
    cancelText: '取消',
    onClose: () => { },
    showClose: false,
    type: '',
    confirmStyle: null,
    okTextStyle: null,
    cancelStyle: null,
    cancelTextStyle: null,
    footer: null,
  }

  static propTypes = {
    // 是否显示
    visible: PropTypes.bool,
    // 蒙层是否可关闭
    maskClosable: PropTypes.bool,
    // 动画类型
    animationType: PropTypes.string,
    // 是否使用动画
    animateWhenMount: PropTypes.bool,
    // title
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // modal类型
    type: PropTypes.oneOf(['confirm', 'alert']),
    // 确认按钮文案
    okText: PropTypes.string,
    // 确认按钮样式
    confirmStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 确认按钮文本样式
    okTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 取消按钮文案
    cancelText: PropTypes.string,
    // 取消按钮样式
    cancelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 取消文本样式
    cancelTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // 内容
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // 关闭回调
    onClose: PropTypes.func,
    // 底部按钮数组
    footer: PropTypes.node,

    showClose: PropTypes.bool,
    // dialog 大小
  }

  static show = (opt = {}) => {
    const {
      onClose, ...props
    } = opt;
    if (this._modal) {
      this._modal.destroy();
      this._modal = null;
    }
    this._modal = new RootSiblings((
      <Dialog
        visible
        onClose={() => {
          if (onClose) {
            onClose();
          }
        }}

        {...props}
      />
    ));
    console.log(opt, this._modal);
  }

  static hide = () => {
    this._modal.destroy();
    this._modal = null;
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  onClose() {
    this.setState({ visible: false });
  }

  _maskClose = () => {
    const { maskClosable, onClose } = this.props;
    if (maskClosable && onClose) {
      onClose();
    }
  }


  _header(title) {
    return (
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
    );
  }

  _children(content) {
    return typeof content === 'string' ? (
      <View style={{ marginBottom: 12, marginTop: 12 }}>
        <Text style={styles.content}>{content}</Text>
      </View>
    ) : content;
  }

  _footer() {
    const { type } = this.props;
    switch (type) {
      case 'confirm':
        return this._confirmFooter();
      case 'alert':
        return this._alertFooter();
      default:
        return null;
    }
  }

  _confirmFooter() {
    const {
      okText, cancelText, onConfirm, onCancel, cancelStyle, confirmStyle, okTextStyle, cancelTextStyle,
    } = this.props;
    return (
      <View
        style={styles.footer}
      >
        <TouchableOpacity
          style={[{
            paddingLeft: 20,
            paddingRight: 20,
            height: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }, cancelStyle]}
          onPress={() => {
            this.onClose();
            onCancel && onCancel();
          }}
        >
          <Text style={[{
            color: Themes.themeColor,
            fontSize: 14,
            fontWeight: '600',
          }, cancelTextStyle]}
          >
            {cancelText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            minWidth: 88,
            backgroundColor: Themes.themeColor,
            height: 28,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }, confirmStyle]}
          onPress={() => {
            this.onClose();
            onConfirm && onConfirm();
          }}
        >
          <Text style={[{
            color: '#F8F7F7',
            fontSize: 14,
            fontWeight: '600',
          }, okTextStyle]}
          >
            {okText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _alertFooter() {
    const {
      okText, onConfirm,
    } = this.props;
    return (
      <View
        style={styles.footer}
      >
        <TouchableOpacity
          style={{
            minWidth: 88,
            backgroundColor: Themes.themeColor,
            height: 28,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}
          onPress={() => {
            this.onClose();
            onConfirm && onConfirm();
          }}
        >
          <Text style={{
            color: '#F8F7F7',
            fontSize: 14,
            fontWeight: '600',
          }}
          >
            {okText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      animateWhenMount, onClose, animationType, title, content, footer, children, maskClosable, showClose,
    } = this.props;
    const { visible } = this.state;
    const header = typeof title === 'string' ? this._header(title) : title;
    const body = content ? this._children(content) : children;
    const btns = footer || this._footer();
    return (
      <Modal
        onClose={() => {
          this.setState({ visible: false });
          onClose && onClose();
        }}
        maskClosable={maskClosable}
        animationType={animationType}
        visible={visible}
        animateWhenMount={animateWhenMount}
        springEffect
        style={{ justifyContent: 'center' }}
        contentStyle={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
        }}
      >
        <View style={styles.body}>
          {showClose && (
          <TouchableOpacity
            style={{
              height: 44,
              width: 44,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 90,
            }}
            onPress={() => this.onClose()}
          >
            <Image
              source={require('../../images/close.png')}
              style={{ width: 12, height: 12 }}
            />
          </TouchableOpacity>)}
          {header}
          {body}
          {btns}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  // 内部样式 （即modal容器）
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 内部内容区样式 （即modal内容区）
  innerContent: {
    borderRadius: 20,
    width: '80%',
    overflow: 'hidden',
  },
  body: {
    padding: 20,
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
  },
  header: {
    fontSize: 20,
    color: '#0F1D37',
    lineHeight: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 13,
    color: '#9398A5',
    lineHeight: 23,
  },
  footer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  maskClosable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  closeWrap: {
    position: 'absolute',
    top: 0,
    left: 15,
  },
  close: {
    fontSize: 40,
    fontWeight: '200',
    color: '#bcbcbc',
    lineHeight: 44,
  },
  // 水平按钮组
  buttonGroupH: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  // 垂直按钮组
  buttonGroupV: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  buttonWrapH: {
    flexGrow: 1,
    borderColor: '#EEE',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingVertical: 11,
  },
  buttonWrapV: {
    flexGrow: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EEE',
    paddingVertical: 11,
  },
  buttonText: {
    textAlign: 'center',
    color: '#0076FF',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
});
