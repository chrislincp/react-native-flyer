import { NavigationActions, StackActions } from 'react-navigation';

class Navigator {
  routers

  navigation

  /**
   * 设置当前路由栈和导航对象
   * @param routers
   * @param navigation
   */
  setRouters(routers, navigation) {
    this.routers = routers;
    this.navigation = navigation;
  }

  /**
   * 跳转到另一个页面
   * @param routeName
   * @param params
   */
  navigate(routeName, params = {}) {
    this.navigation.navigate(routeName, params);
  }

  /**
   * 跳转到另一个页面
   * @param routeName
   * @param params
   */
  push(routeName, params = {}) {
    this.navigation.push(routeName, params);
  }

  /**
   * 回退到某一页面或回退几步
   * @param routeNameOrStepsNum
   */
  pop(routeNameOrStepsNum) {
    if (!routeNameOrStepsNum) {
      this.navigation.pop(1);
      return;
    }
    const len = this.routers.length;
    if (typeof routeNameOrStepsNum === 'number') {
      if (routeNameOrStepsNum > len) {
        this.popToTop();
      }
      this.navigation.pop(routeNameOrStepsNum);
      return;
    }

    if (typeof routeNameOrStepsNum === 'string') {
      console.log(this.routers);
      let navKey;
      this.routers.forEach((route, i) => {
        if (routeNameOrStepsNum === route.routeName) {
          navKey = this.routers[i + 1].key;
        }
      });
      this.navigation.goBack(navKey || null);
    }
  }

  /**
   * 回到顶层页面
   */
  popToTop() {
    this.navigation.popToTop();
  }

  /**
   * 替换当前页面
   * @param routeName
   * @param params
   */
  replace(routeName, params) {
    this.navigation.replace(routeName, params);
  }

  /**
   * 重置路由 ["Home","Login"]
   * @param routeArr
   */
  reset(routeArr) {
    const routeStack = routeArr.map(item => NavigationActions.navigate({ routeName: item }));
    const resetAction = StackActions.reset({
      index: routeStack.length - 1,
      actions: routeStack,
    });
    this.navigation.dispatch(resetAction);
  }
}

const navigator = new Navigator();

export default navigator;
