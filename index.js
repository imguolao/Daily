import {AppRegistry} from 'react-native';
import DrawerNav from './src/navigations/AppNavigators';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => DrawerNav); 