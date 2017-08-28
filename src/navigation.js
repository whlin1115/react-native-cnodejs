import { StackNavigator } from 'react-navigation';
import Home from './pages/home';

const Navigation = StackNavigator({
  Home: { screen: Home },
});

export default Navigation;