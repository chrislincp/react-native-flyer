import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { DragList } from 'flyer';
import Page from '../../../components/Page';

export default class DragListPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { text: 'world' },
        { text: 'are you' },
        { text: 123 },
        { text: 'is' },
        { text: 'a' },
      ],
    };
  }

  renderItem(data) {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{data.text}</Text>
      </TouchableHighlight>
    );
  }

  _renderBase() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <DragList
          data={data}
          onChange={val => this.setState({ data: val })}
          renderRow={row => this.renderItem(row)}
        />
      </View>

    );
  }
}
