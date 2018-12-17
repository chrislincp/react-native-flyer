import React from 'react';
import { View, Text } from 'react-native';
import Page from '../../components/Page';

export default class Test extends Page {
  _headerProps() {
    return {
      title: 'test',
    };
  }

  _render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }
}
