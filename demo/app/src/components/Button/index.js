import React from 'react';
import { View } from 'react-native';
import { Button } from 'flyer';
import Page from '../../../components/Page';

export default class ButtonPage extends Page {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: 'Button',
    };
  }

  _render() {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Button title="按钮1" style={{ marginTop: 20 }} />
        <Button title="按钮1 禁用" disabled style={{ marginTop: 20 }} />
        <Button title="按钮2 circle" circle style={{ marginTop: 20 }} />
        <Button title="按钮2 circle disabled" disabled circle style={{ marginTop: 20 }} />
        <Button title="按钮3 border" type="border" style={{ marginTop: 20 }} />
        <Button title="按钮3 border disabled" disabled type="border" style={{ marginTop: 20 }} />
        <Button title="按钮4 border circle" circle type="border" style={{ marginTop: 20 }} />
        <Button title="按钮4 border circle disabled" circle disabled type="border" style={{ marginTop: 20 }} />
      </View>
    );
  }
}
