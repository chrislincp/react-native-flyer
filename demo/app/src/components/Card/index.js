import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'flyer';
import Page from '../../../components/Page';

export default class CardPage extends Page {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: 'Card',
    };
  }

  _render() {
    return (
      <View style={{ padding: 20 }}>
        <Card>
          <Text>this is card content</Text>
        </Card>
        <Card style={{ marginTop: 20 }} onPress={() => console.log('card')}>
          <Text>this is card content can onpress</Text>
        </Card>
      </View>
    );
  }
}
