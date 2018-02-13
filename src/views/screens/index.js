import {Navigation} from 'react-native-navigation';
import LoginScreen from "./LoginScreen";
import RepositoryListScreen from "./RepositoryListScreen";

export function registerScreens() {
    Navigation.registerComponent('Login', () => LoginScreen);
    Navigation.registerComponent('RepositoryList', () => RepositoryListScreen);
}