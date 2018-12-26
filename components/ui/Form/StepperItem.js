import React from 'react';
import PropTypes from 'prop-types';
import BaseItem from './BaseItem';
import Stepper from '../Stepper';

export default class StepperItem extends React.Component {
  static defaultProps = {
    isLast: false,
    disabled: false,
    min: 0,
    max: 99,
    value: 0,
    step: 1,
    title: '',
    onChange: () => {},
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    // 是否是最后一个
    isLast: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, isLast, ...props } = this.props;
    return <BaseItem isLast={isLast} title={title} right={<Stepper {...props} />} />;
  }
}
