import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import BaseItem from './BaseItem';
import Input from '../Input';

export default class InputItem extends React.Component {
  static defaultProps = {
    isLast: false,
    unit: '',
    right: null,
    title: '',
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // 是否是最后一个
    isLast: PropTypes.bool,
    unit: PropTypes.string,
    right: PropTypes.element,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title, isLast, unit, right, ...props
    } = this.props;
    const rightComponent = (
      <Input
        {...props}
        inputStyle={{ textAlign: 'right' }}
        right={unit ? <Text style={{ marginLeft: 8 }}>{unit}</Text> : right}
      />);
    return (
      <BaseItem title={title} isLast={isLast} right={rightComponent} />
    );
  }
}
