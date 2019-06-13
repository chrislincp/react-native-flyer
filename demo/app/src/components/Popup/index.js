import React from 'react';
import { View, Text } from 'react-native';
import { Popup, Button } from 'flyer';
import Page from '../../../components/Page';

export default class PopMenuPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _headerProps() {
    return {
      title: 'PopMenu',
    };
  }

  showPopup(pos) {
    const opt = {
      position: pos,
      style: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      children: this.renderPopupContent(),
    };
    Popup.show(opt);
  }

  renderPopupContent() {
    return (
      <View>
        <Text onPress={() => Popup.hide()}>手动关闭</Text>
      </View>
    );
  }

  _render() {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Button title="show popup top" onPress={() => this.showPopup('top')} />
        <Button title="show popup bottom" onPress={() => this.showPopup('bottom')} />
        <Button title="show popup left" onPress={() => this.showPopup('left')} />
        <Button title="show popup right" onPress={() => this.showPopup('right')} />
      </View>
    );
  }
}
