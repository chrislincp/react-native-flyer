import React from 'react';
import { View } from 'react-native';
import { Form } from 'flyer';
import Page from '../../components/Page';

export default class Home extends Page {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { label: 'ActivityIndicator', value: 'ActivityIndicator' },
        { label: 'Button', value: 'Button' },
        { label: 'Card', value: 'Card' },
        { label: 'Dialog', value: 'Dialog' },
        { label: 'DragList', value: 'DragList' },
        { label: 'Form', value: 'Form' },
        { label: 'PopMenu', value: 'PopMenu' },
        { label: 'Toast', value: 'Toast' },
      ],
    };
  }

  _headerProps() {
    return {
      title: '组件库',
      left: <View />,
    };
  }

  _render() {
    const { list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {list.map((item, index) => (
          <Form.Base
            key={index}
            title={item.label}
            isLast={index + 1 === list.length}
            showArrow
            placeholder=" "
            onPress={() => this.navigator.push(item.value)}
          />
        ))}
      </View>
    );
  }
}
