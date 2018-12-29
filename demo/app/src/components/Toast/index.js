import React from 'react';
import { View } from 'react-native';
import { Button, Toast } from 'flyer';
import Page from '../../../components/Page';

export default class ToastPage extends Page {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: 'Toast',
    };
  }

  show() {
    Toast.show('这是一个普通的toast提示');
  }

  success() {
    Toast.success(('成功'));
  }

  fail() {
    Toast.fail('失败');
  }

  loading() {
    Toast.loading();
    setTimeout(() => {
      Toast.success('成功');
    }, 3000);
  }

  _render() {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Button title="普通 toast show" style={{ marginTop: 20 }} onPress={() => this.show()} />
        <Button title="成功 toast" style={{ marginTop: 20 }} onPress={() => this.success()} />
        <Button title="失败 toast" style={{ marginTop: 20 }} onPress={() => this.fail()} />
        <Button title="loading toast 3s后提示成功" style={{ marginTop: 20 }} onPress={() => this.loading()} />
      </View>
    );
  }
}
