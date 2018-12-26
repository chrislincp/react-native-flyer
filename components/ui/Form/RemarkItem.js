import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Input from '../Input';
import { Themes } from '../../uitls';

export default class RemarkItem extends React.Component {
  static defaultProps = {
    title: '备注',
    max: 150,
    value: '',
    onChangeText: () => {},
    style: null,
  }

  static propTypes = {
    title: PropTypes.string,
    max: PropTypes.number,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    style: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title, max, value, style, ...props
    } = this.props;
    return (
      <View style={[{ backgroundColor: 'white' }, style]}>
        <View
          style={{
            height: 55,
            borderBottomWidth: Themes.hairLineWidth,
            borderColor: Themes.dividersColor,
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </View>
        <Input
          style={{ margin: 20, flex: 1, height: 113 }}
          value={value}
          multiline
          maxLength={max}
          {...props}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 20,
            paddingTop: 0,
            paddingBottom: 16,
          }}
        >
          <Text style={{ color: '#CDD1D5', fontSize: 12 }}>
            {`${
              value ? value.length : '0'
            } / ${max}`}

          </Text>
        </View>
      </View>
    );
  }
}
