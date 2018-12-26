import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text, Image, StyleSheet,
} from 'react-native';

export default class Stepper extends React.Component {
  static defaultProps = {
    disabled: false,
    min: 0,
    max: 99,
    step: 1,
    value: 0,
    onChange: () => {},
  }

  static propTypes = {
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress(from) {
    const {
      value, step, min, max, onChange,
    } = this.props;
    if (!isNaN(value)) {
      let num = value - 0;
      if (from === 'dec') {
        num -= step;
        num = num < min ? min : num;
      } else if (from === 'inc') {
        num += step;
        num = num > max ? max : num;
      }
      onChange(num);
    }
  }

  _stepperRender() {
    const {
      min, max, value, disabled,
    } = this.props;
    const decDisabled = disabled || (value === min);
    const incDisabled = disabled || (max && value === max);
    return (
      <View
        style={styles.container}
      >
        <TouchableOpacity
          // style={[styles.btn, decDisabled && { borderColor: '#EDEDEE' }]}
          disabled={decDisabled}
          onPress={() => this.onPress('dec')}
        >
          {
            decDisabled ? <Image style={styles.btnText} source={require('../../images/minus_disabled.png')} />
              : <Image style={styles.btnText} source={require('../../images/minus.png')} />
          }
          {/* <Text style={[styles.btnText, decDisabled && { color: '#EDEDEE' }]}>-</Text> */}
        </TouchableOpacity>
        <View style={styles.valueWrap}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <TouchableOpacity
          // style={[styles.btn, incDisabled && { borderColor: '#EDEDEE' }]}
          onPress={() => this.onPress('inc')}
          disabled={incDisabled}
        >
          {
            incDisabled ? <Image style={styles.btnText} source={require('../../images/add_line_disabled.png')} />
              : <Image style={styles.btnText} source={require('../../images/add_line.png')} />
          }
          {/* <Text style={[styles.btnText, incDisabled && { color: '#EDEDEE' }]}><Icon name="plus" size={12} /></Text> */}
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    return this._stepperRender();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 27,
    height: 27,
    borderRadius: 27,
    borderColor: '#2C6DF3',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    width: 27,
    height: 27,
  },
  valueWrap: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: '#0F1D37',
    fontSize: 16,
  },
});
