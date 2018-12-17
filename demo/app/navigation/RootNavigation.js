import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import Tab from '../src/tab';
import routes from './Routes';
// import Home from '../src/tab/Home';

const RootStack = createStackNavigator(
  {
    Tab: { screen: Tab },
    ...routes,
  },
  {
    headerMode: 'none',
  },
);


const RootNavigation = createSwitchNavigator(
  {
    RootStack,
  },
  {
    initialRouteName: 'RootStack',
    headerMode: 'none',
  },
);

export default createAppContainer(RootNavigation);
