import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Themes } from '../../uitls';

export default class Item extends React.Component {
  static defaultProps = {
    isLast: false,
    placeholder: '请选择',
    showArrow: false,
    onPress: null,
    onLongPress: null,
    title: '',
    right: null,
    disabled: false,
  }

  static propTypes = {
    // 标题
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
    // 右边组件
    right: PropTypes.node,
    // 禁用
    disabled: PropTypes.bool,
    // 是否是最后一个
    isLast: PropTypes.bool,
    //  占位符
    placeholder: PropTypes.string,
    // 单击
    onPress: PropTypes.func,
    // 长按
    onLongPress: PropTypes.func,
    showArrow: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onPress, onLongPress, title, isLast, right, disabled, value, placeholder, showArrow, style,
    } = this.props;
    const left = (typeof title === 'string' || typeof title === 'number') ? (
      <Text style={styles.title}>{title}</Text>
    ) : title;
    const rightComponent = right
    || (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {value ? <Text style={styles.title} numberOfLines={1}>{value}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}
      {showArrow && <Image source={require('../../images/right_arrow.png')} style={{ width: 12, height: 12, marginLeft: 4 }} />}
    </View>
    );
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          disabled={disabled || (!onPress && !onLongPress)}
          onPress={() => { onPress ? onPress() : {}; }}
          onLongPress={() => { onLongPress ? onLongPress() : {}; }}
        >
          <View style={[styles.content, isLast && styles.noLine]}>
            <View style={{ marginRight: 20 }}>{left}</View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>{rightComponent}</View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginLeft: 20,
    paddingRight: 20,
    borderBottomColor: Themes.dividersColor,
    borderBottomWidth: Themes.hairLineWidth,
  },
  icon: {
    fontSize: 15,
    width: 26,
    color: '#43484d',
  },
  title: {
    fontSize: 14,
    color: '#0F1D37',
  },
  placeholder: {
    fontSize: 14,
    color: '#CDD1D5',
  },
  rightArrow: {
    fontSize: 16,
    color: '#43484d',
    paddingRight: 10,
  },
  noLine: {
    borderBottomWidth: 0,
  },
});
