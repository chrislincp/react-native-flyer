import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Themes } from '../../uitls';

export default class Card extends React.Component {
  static defaultProps = {
    style: {},
    children: null,
  }

  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children, style, onPress, disabled, ...props
    } = this.props;
    return <TouchableOpacity disabled={disabled || (!onPress)} onPress={() => (onPress ? onPress() : {})} style={[styles.container, style]} {...props}>{children}</TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#CFD2D6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
    borderWidth: Themes.hairLineWidth,
    borderColor: '#ECEDF4',
  },
});
