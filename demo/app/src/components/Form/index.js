import React from 'react';
import { View } from 'react-native';
import { Form } from 'flyer';
import Page from '../../../components/Page';

export default class FormPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: [],
      value3: '2',
      value4: 0,
      value5: '',
      value6: '',
    };
  }

  _headerProps() {
    return {
      title: 'Form',
    };
  }

  _render() {
    const data = [
      { label: '测试1', value: '1' },
      { label: '测试2', value: '2' },
      { label: '测试3', value: '3' },
      { label: '测试4', value: '4' },
      { label: '测试5', value: '5' },
      { label: '测试6', value: '6' },
      { label: '测试7', value: '7' },
      { label: '测试8', value: '8' },
    ];
    const {
      value1, value2, value3, value4, value5, value6,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Form.ActionSheet title="ActionSheet" data={data} value={value1} onChange={val => this.setState({ value1: val })} />
        <Form.ActionSheet title="ActionSheet multiple" multiple data={data} value={value2} onChange={val => this.setState({ value2: val })} />
        <Form.ActionSheet title="ActionSheet disabled" disabled />
        <Form.ActionSheet title="ActionSheet defaultValue" data={data} value={value3} onChange={val => this.setState({ value3: val })} />
        <Form.Stepper title="stepper" value={value4} onChange={val => this.setState({ value4: val })} />
        <Form.Stepper title="stepper disabled" disabled />
        <Form.Input title="input" value={value5} onChangeText={val => this.setState({ value5: val })} />
        <Form.Remark style={{ marginTop: 12 }} title="remark" value={value6} onChangeText={val => this.setState({ value6: val })} />
      </View>
    );
  }
}
