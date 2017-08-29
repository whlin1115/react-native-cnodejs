import { StackNavigator } from 'react-navigation';
import Home from './pages/home';
import Detail from './pages/detail';

const Navigation = StackNavigator({
  Home: { screen: Home },
  Detail: { screen: Detail },
}, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      headerTintColor: '#FFFFFF'
    }
  });

export default Navigation;