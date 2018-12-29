import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PopMenu } from 'flyer';
import Page from '../../../components/Page';

export default class PopMenuPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
    };
  }

  _headerProps() {
    return {
      title: 'PopMenu',
    };
  }

  _render() {
    const data = [
      { label: '测试1', value: '1' },
      { label: '测试2', value: '2' },
      { label: '测试3', value: '3' },
    ];
    const { value1, value2, value3 } = this.state;
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <PopMenu position="left" data={data} value={value1} onChange={val => this.setState({ value1: val.value })}>
            <View style={styles.item}><Text style={{ color: '#fff' }}>left</Text></View>
          </PopMenu>
          <PopMenu position="left" data={data} value={value2} onChange={val => this.setState({ value2: val.value })}>
            <View style={styles.item}><Text style={{ color: '#fff' }}>center</Text></View>
          </PopMenu>
          <PopMenu position="right" data={data} value={value3} onChange={val => this.setState({ value3: val.value })}>
            <View style={styles.item}><Text style={{ color: '#fff' }}>right</Text></View>
          </PopMenu>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 36,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
