import React from 'react';
import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // Header.setColorAndBackgroundColor({ color: "transparent", transparent: true })
  }

  render() {
    // 忽略warning
    console.ignoredYellowBox = [
      'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
      'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
      'Warning: isMounted(...) is deprecated',
    ];

    console.disableYellowBox = true; // 关闭全部黄色警告

    return <RootNavigation persistenceKey={null} />;
  }
}
