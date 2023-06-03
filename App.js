import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import Login from './LoginScreen/Login';
import TsxScreen from './Components/TsxScreen';
import Danhsach from './Components/Danhsach';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "">
        <Stack.Screen name = "Login" component ={Login}/>
        <Stack.Screen name = "TsxScreen" component ={TsxScreen}/>
        <Stack.Screen name = "Danhsach" component = {Danhsach}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
