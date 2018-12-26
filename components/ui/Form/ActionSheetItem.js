import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import BaseItem from './BaseItem';
import ActionSheet from '../ActionSheet';

export default class ActionSheetItem extends React.Component {
  static defaultProps = {
    disabled: false,
    title: '',
    isLast: false,
    data: [],
    value: '',
    multiple: false,
    placeholder: '请选择',
    config: {
      label: 'label',
      value: 'value',
    },
    onChange: () => {},
    right: null,
  }

  static propTypes = {
    // 禁用
    disabled: PropTypes.bool,
    // 标题
    title: PropTypes.node,
    // 是否是最后一个
    isLast: PropTypes.bool,
    //  data 数据
    data: PropTypes.arrayOf(PropTypes.object),
    //  value
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    // 是否多选
    multiple: PropTypes.bool,
    //  设置数据格式
    config: PropTypes.oneOfType([PropTypes.object]),
    // 右边组件
    right: PropTypes.node,
    // change事件
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this._initValue(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValue: this._initValue(nextProps),
    });
  }

  _initValue(props) {
    const {
      multiple, data, value, config,
    } = props;
    let selectedValue;
    if (multiple) {
      selectedValue = [];
      if (value.length) {
        value.forEach((val) => {
          selectedValue.push(this.convertValue(data, val, config));
        });
      }
      selectedValue = selectedValue.join(',');
    } else {
      selectedValue = this.convertValue(data, value, config);
    }
    return selectedValue;
  }

  convertValue(data = [], value, config) {
    config = config || { label: 'label', value: 'value' };
    let label = '';
    if (!data || !data.length) return label;
    data.forEach((item) => {
      if (item[config.value] === value) label = item[config.label];
    });
    return label;
  }

  _onPress() {
    const {
      data, value, multiple, onChange, ...props
    } = this.props;
    let opt = {
      data,
      value,
      multiple,
      onChange: (val, item, index) => onChange(val, item, index),
    };
    opt = Object.assign(opt, { ...props });
    ActionSheet.show(opt);
  }

  render() {
    const {
      placeholder, title, right, disabled, isLast, style,
    } = this.props;
    const { selectedValue } = this.state;
    const rightComponent = right || (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {selectedValue
          ? <Text numberOfLines={1} style={[styles.text, styles.valueText]}>{selectedValue}</Text>
          : <Text numberOfLines={1} style={[styles.text, styles.placeholder]}>{placeholder}</Text>}
        <Image source={require('../../images/right_arrow.png')} style={{ width: 12, height: 12, marginLeft: 4 }} />
      </View>);
    return (
      <BaseItem
        style={style}
        title={title}
        disabled={disabled}
        isLast={isLast}
        onPress={() => this._onPress()}
        right={rightComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  placeholder: {
    color: '#CDD1D5',
  },
  valueText: {
    color: '#0F1D37',
  },
});
