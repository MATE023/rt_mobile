import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import ProblemsScreen from './pages/problems';
import ProblemScreen from './pages/problemView';
import HomeScreen from './pages/home';

export type RootStackParamList = {
  Home: undefined;
  Problems: undefined;
  ProblemDetails: { problemTitle: string, problemId: string; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'rt', headerTitleAlign: 'center' }}/>
        <Stack.Screen name="Problems" component={ProblemsScreen} options= {{ title: 'Problems', headerTitleAlign: 'center', 
        headerStyle: {
            }}} />
        <Stack.Screen name="ProblemDetails" component={ProblemScreen} options={({ route }) => ({ title: `${route.params.problemId}: ${route.params.problemTitle}`, headerTitleAlign: 'center' })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
