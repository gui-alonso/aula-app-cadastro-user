import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserFormScreen from './screens/UserFormScreen';
import UserListScreen from './screens/UserListScreen';
import LoginScreen from './screens/LoginScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="UserList" 
          component={UserListScreen} 
          options={{ title: 'Lista de Usuários' }}
        />
        <Stack.Screen 
          name="UserForm" 
          component={UserFormScreen} 
          options={{ title: 'Formulário de Usuário' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" /> 
    </NavigationContainer>
  );
}