import React from 'react';
import { View, Text } from 'react-native';
import Page from '../../components/Page';

export default class Home extends Page {
  _headerProps() {
    return {
      title: 'Utils',
      left: <View />,
    };
  }

  _render() {
    return (
      <Text>Utils</Text>
    );
  }
}
