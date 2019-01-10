import React from 'react';
import PropTypes from 'prop-types';
import SortableListView from 'react-native-sortable-listview';

export default class DragList extends React.Component {
  static propTpes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    renderRow: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
    onChange: () => {},
    activeOpacity: 1,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: this.convertData(props.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: this.convertData(nextProps.data) });
  }

  onChange(order, data) {
    const { onChange } = this.props;
    const arr = [];
    order.forEach((key) => {
      arr.push(data[key]);
    });
    onChange(arr);
  }

  convertData(data) {
    const obj = {};
    data.forEach((item, index) => {
      obj[index] = item;
    });
    return obj;
  }

  render() {
    const { data } = this.state;
    const { activeOpacity, ...props } = this.props;
    const order = Object.keys(data);
    return (
      <SortableListView
        data={data}
        order={order}
        activeOpacity={activeOpacity}
        onRowMoved={(e) => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          this.onChange(order, data);
        }}
        {...props}
      />
    );
  }
}
