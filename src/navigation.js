import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './pages/home';
import Detail from './pages/detail';
import Search from './pages/search';

import Publish from './pages/publish';
import Notice from './pages/notice';
import Recruit from './pages/recruit';

// Zone Navigator
import Zone from './pages/zone';
import Setting from './pages/zone/screen/setting';

const Tabs = TabNavigator({
  Home: { screen: Home },
  Recruit: { screen: Recruit },
  Notice: { screen: Notice },
  Zone: { screen: Zone },
}, {
    tabBarOptions: {
      activeTintColor: '#73B601',
      style: {
        backgroundColor: '#fff',
      },
    },
    swipeEnabled: true,
  });

const Navigation = StackNavigator({
  Tabs: { screen: Tabs },
  Detail: { screen: Detail },
  Search: { screen: Search },
  Setting: { screen: Setting },
  Publish: { screen: Publish },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      headerTintColor: '#FFFFFF'
    },
    headerMode: 'screen'
  });

export default Navigation;