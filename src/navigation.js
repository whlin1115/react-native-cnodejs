import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './pages/home';
import Detail from './pages/detail';
import Search from './pages/search';
import Publish from './pages/publish';
import Notice from './pages/notice';
import Recruit from './pages/recruit';

// Zone Navigator
import Zone from './pages/zone';
import Login from './pages/zone/screen/Login';
import About from './pages/zone/screen/About';
import Reply from './pages/zone/screen/Reply';
import Topic from './pages/zone/screen/Topic';
import Github from './pages/zone/screen/Github';
import Credits from './pages/zone/screen/Credits';
import Collect from './pages/zone/screen/Collect';
import Setting from './pages/zone/screen/Setting';
import Password from './pages/zone/screen/Password';

const Tabs = TabNavigator({
  Home: { screen: Home },
  Recruit: { screen: Recruit },
  Notice: { screen: Notice },
  Zone: { screen: Zone },
}, {
    tabBarOptions: {
      activeTintColor: '#7a86a2',
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
  Publish: { screen: Publish },
  // Zone
  Login: { screen: Login },
  About: { screen: About },
  Reply: { screen: Reply },
  Topic: { screen: Topic },
  Github: { screen: Github },
  Credits: { screen: Credits },
  Collect: { screen: Collect },
  Setting: { screen: Setting },
  Password: { screen: Password },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      headerTintColor: '#FFFFFF'
    },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 安卓导航进入 左右方式
    }),
    headerMode: 'screen'
  });

export default Navigation;