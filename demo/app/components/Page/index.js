import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';
import {
  Header,
} from 'flyer';
import navigator from '../../navigation/navigator';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    const parentNavigation = props.navigation.dangerouslyGetParent();
    navigator.setRouters(parentNavigation.state.routes, parentNavigation);
    this.navigation = props.navigation;
    this.navParams = props.navigation.state.params;
    this.navigator = navigator;
    this.state = {
    };
  }

  _renderHeader() {
    return <Header leftPress={() => navigator.pop()} {...this._headerProps()} />;
  }

  _headerProps() {
    return {};
  }

  _render() {
    return null;
  }

  _renderBase() {
    return null;
  }

  _scrollViewProps() {
    return {};
  }

  _setSafeAreaViewInset() {
    return {
      top: 'never',
    };
  }

  _setSafeAreaViewStyle() {
    return {};
  }

  _renderStyle() {
    return { backgroundColor: '#F8F8F9' };
  }

  render() {
    return (
      <SafeAreaView
        style={[styles.container, this._setSafeAreaViewStyle()]}
        forceInset={this._setSafeAreaViewInset()}
      >
        {this._renderHeader()}
        {this._renderBase() ? (
          <View style={[{ flex: 1 }, this._renderStyle()]}>
            {this._renderBase()}
          </View>
        ) : (
          <Fragment>
            <KeyboardAwareScrollView
              style={this._renderStyle()}
              showsVerticalScrollIndicator={false}
              {...this._scrollViewProps()}
            >
              {this._render()}
            </KeyboardAwareScrollView>
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
