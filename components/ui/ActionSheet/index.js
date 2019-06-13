import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Modal from '../Modal';
import { Themes } from '../../uitls';
import { ifIphoneX } from '../../uitls/Utils';

export default class ActionSheet extends React.Component {
  static defaultProps = {
    visible: true,
    clear: true,
    multiple: false,
    title: '请选择',
    data: [],
    onClose: () => { },
    onChange: () => { },
    config: {
      label: 'label',
      value: 'value',
    },
  }

  static propTypes = {
    visible: PropTypes.bool,
    clear: PropTypes.bool,
    multiple: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.oneOfType([PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    titleRender: PropTypes.func,
    checkedIcon: PropTypes.node,
  }

  static show(opt = {}) {
    if (this._actionSheet) {
      this._actionSheet.destroy();
      this._actionSheet = null;
    }
    const { onClose, onChange, ...props } = opt;
    const visible = true;
    this._actionSheet = new RootSiblings((
      <ActionSheet
        visible={visible}
        onClose={() => {
          if (onClose) onClose();
        }}
        onChange={(val, item, index) => {
          if (onChange) onChange(val, item, index);
        }}
        {...props}
      />
    ));
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.initValue(props),
      visible: this.props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValue: this.initValue(nextProps),
      visible: nextProps.visible,
    });
  }

  initValue(props) {
    const { data, value, config } = props;
    let selectedValue = {};
    if (value) {
      if (typeof (value) === 'string') {
        data && data.length && data.forEach((item) => {
          if (item[config.value] === value) {
            selectedValue = { [value]: true };
          }
        });
      } else {
        value && value.length && value.forEach((val) => {
          data && data.length && data.forEach((item) => {
            if (item[config.value] === val) {
              selectedValue[val] = true;
            }
          });
        });
      }
    }
    return selectedValue;
  }

  _onClose() {
    this.props.onClose();
  }

  _onSelect(item, index) {
    const { multiple, config } = this.props;
    let selectedValue = Object.assign({}, this.state.selectedValue);
    if (multiple) {
      if (selectedValue[item[config.value]]) {
        delete selectedValue[item[config.value]];
      } else {
        selectedValue[item[config.value]] = true;
      }
      this.setState({ selectedValue });
    } else {
      selectedValue = {
        [item[config.value]]: true,
      };
      // this.setState({ selectedValue });
      this._onChange(selectedValue, item, index);
    }
  }

  _onClear() {
    this.setState({ selectedValue: {} });
  }

  _onChange(selectedValue, dataItem, index) {
    this.setState({ visible: false });
    let value;
    const { data, multiple, config } = this.props;
    const valueKeys = Object.keys(selectedValue);
    if (multiple) {
      value = [];
      if (valueKeys.length) {
        valueKeys.forEach((key) => {
          data && data.length && data.forEach((item) => {
            if (key === item[config.value]) value.push(item[config.value]);
          });
        });
      }
    } else {
      value = '';
      if (valueKeys.length) {
        valueKeys.forEach((key) => {
          data && data.length && data.forEach((item) => {
            if (key === item[config.value]) value = item[config.value];
          });
        });
      }
    }
    console.log(value);
    this.props.onChange(value, dataItem, index);
  }

  _contentRender() {
    const {
      data, config, title, clear, multiple, titleRender, checkedIcon,
    } = this.props;
    const { selectedValue } = this.state;
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.btns}>
            {clear && multiple && (
              <TouchableOpacity
                style={styles.btn}
                disabled={!Object.keys(selectedValue).length && clear}
                onPress={() => this._onClear()}
              >
                <Text
                  style={[
                    styles.btnText,
                    multiple && { color: '#0F1D37' },
                    !Object.keys(selectedValue).length && { opacity: 0.5 },
                  ]}
                >
                    清空
                </Text>
              </TouchableOpacity>
            ) }
            {multiple
              && (
              <TouchableOpacity style={styles.btn} onPress={() => this._onChange(this.state.selectedValue)}>
                <Text style={[styles.btnText, { color: Themes.themeColor }]}>确定</Text>
              </TouchableOpacity>
              ) }
          </View>
        </View>
        <ScrollView style={{ maxHeight: 240 }}>
          {data && data.length > 0 ? data.map((item, index) => (
            <TouchableOpacity style={[styles.item, index + 1 === data.length && { marginBottom: 6 }]} key={item[config.value]} onPress={() => this._onSelect(item, index)}>
              {titleRender ? titleRender(item[config.label]) : <Text style={styles.itemTitle}>{item[config.label]}</Text>}
              {selectedValue[item[config.value]]
              && (checkedIcon || (
                <Image
                  style={{ width: 18, height: 18 }}
                  source={require('../../images/checked.png')}
                />
              ))
              }
            </TouchableOpacity>
          )) : null}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        onClose={() => {
          this.setState({ visible: false });
          this.props.onClose();
        }}
        springEffect={false}
        animationType="slide"
        style={{ justifyContent: 'flex-end' }}
        bodyStyle={{
          width: '90%',
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderRadius: 20,
          marginBottom: ifIphoneX(40, 10),
          overflow: 'hidden',
        }}
        animateWhenMount
      >
        {this._contentRender()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 57,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
  },
  headerTitle: {

  },
  titleText: {
    color: '#9398A5',
    fontSize: 12,
  },
  btns: {
    flexDirection: 'row',
  },
  btn: {
    padding: 8,
  },
  btnText: {
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingLeft: 24,
    paddingRight: 24,
  },
  itemTitle: {
    color: '#0F1D37',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
});
