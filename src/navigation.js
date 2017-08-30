import { StackNavigator } from 'react-navigation';
import Home from './pages/home';
import Detail from './pages/detail';
import Search from './pages/search';
import Zone from './pages/zone';

const Navigation = StackNavigator({
  Home: { screen: Home },
  Detail: { screen: Detail },
  Search: { screen: Search },
  Zone: { screen: Zone },
}, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      headerTintColor: '#FFFFFF'
    },
    headerMode: 'screen'
  });

export default Navigation;