/**
 * 输入域Input
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Themes } from '../../uitls';

export default class Input extends React.Component {
  static defaultProps = {
    clear: false,
    disabled: false,
    multiline: false,
    showBlurClear: false,
    placeholder: '请输入...',
  }

  static propsType = {
    // 是否显示清除按钮
    clear: PropTypes.bool,
    //  是否禁用
    disabled: PropTypes.bool,
    //  是否显示外部清除按钮
    showBlurClear: PropTypes.bool,
    //  是否多行
    multiline: PropTypes.bool,
    //  占位符
    placeholder: PropTypes.string,
    // 受控属性：需配合onChange使用更新数据value
    value: PropTypes.string,
    // 输入回调函数
    onChangeText: PropTypes.func,
    //  右边自定义组件
    right: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      style, inputStyle, value, clear, disabled, multiline, showBlurClear, right, ...props
    } = this.props;
    const obj = {};
    if (typeof value === 'number' || value || value === '') {
      obj.value = `${value}`;
    }
    return (
      <View
        style={[styles.container, style]}
      >
        <TextInput
          ref={(c) => { this.input = c; }}
          style={[{
            flex: 1,
            fontSize: 14,
            height: '100%',
            textAlignVertical: multiline ? 'top' : 'center',
            padding: 0,
            color: '#0F1D37',
          }, inputStyle]}
          {...obj}
          clearButtonMode={clear ? 'while-editing' : 'never'}
          underlineColorAndroid="transparent"
          selectionColor={Themes.themeColor}
          placeholderTextColor="#CDD1D5"
          multiline={multiline}
          editable={!disabled}
          {...props}
        />
        {right && right}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    padding: 0,
  },
});
