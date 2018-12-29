import React from 'react';
import { View } from 'react-native';

import { Dialog, Button, Modal } from 'flyer';
import Page from '../../../components/Page';

export default class DialogPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _headerProps() {
    return {
      title: 'Dialog',
    };
  }


  openConfirm() {
    Dialog.show({
      type: 'confirm',
      title: 'confirm dialog',
      content: 'this is a confirm dialog',
      onConfirm: () => console.log('confirm'),
      onCancel: () => console.log('cancel'),
    });
  }

  openAlert() {
    Dialog.show({
      type: 'alert',
      title: 'alert dialog',
      content: 'this is a alert dialog',
      onConfirm: () => console.log('alert'),
    });
  }

  _render() {
    return (
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Button title="confirm dialog" style={{ marginTop: 20 }} onPress={() => this.openConfirm()} />
        <Button title="alert dialog" style={{ marginTop: 20 }} onPress={() => this.openAlert()} />
      </View>
    );
  }
}
