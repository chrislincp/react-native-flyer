/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabBar } from 'flyer';
import Components from './Components';
import Utils from './Utils';

const Tab = createBottomTabNavigator(
  {
    Components: {
      screen: Components,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <BottomTabBar
            tintColor={tintColor}
            title="组件"
            textStyle={focused ? { fontWeight: '600' } : {}}
            // imageSource={
            //   focused
            //     ? require("../../images/tab_home_active.png")
            //     : require("../../images/tab_home_normal.png")
            // }
          />
        ),
      },
    },
    Utils: {
      screen: Utils,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <BottomTabBar
            tintColor={tintColor}
            title="Utils"
            textStyle={focused ? { fontWeight: '600' } : {}}
            // imageSource={
            //   focused
            //     ? require("../../images/tab_home_active.png")
            //     : require("../../images/tab_home_normal.png")
            // }
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: '#191F25',
      activeTintColor: '#141619',
      style: {
        backgroundColor: 'white',
      },
    },
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false,
  },
);

export default Tab;
