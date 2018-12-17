import React from 'react';
import { Text, View } from 'react-native';
import Page from '../../components/Page';

export default class Home extends Page {
  _headerProps() {
    return {
      title: '组件库',
      left: <View />,
    };
  }

  _render() {
    return (
      <View style={{ flex: 1 }}>
        <Text onPress={() => this.navigator.push('Test')}>Home</Text>
      </View>
    );
  }
}
