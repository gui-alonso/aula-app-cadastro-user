import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserFormScreen from './screens/UserFormScreen';
import UserListScreen from './screens/UserListScreen';

// cria o "stack navigation", que organiza a navegação
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* CORREÇÃO: Altera a tela inicial para "UserList" */}
      <Stack.Navigator initialRouteName="UserList">
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