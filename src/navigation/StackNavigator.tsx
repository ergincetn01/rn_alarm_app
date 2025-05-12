import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStack} from './types';
import AlarmsList from '../screens/alarms/AlarmsList';
import CreateAlarm from '../screens/alarms/CreateAlarm';

const Stack = createNativeStackNavigator<MainStack>();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={AlarmsList} />
      <Stack.Screen name="Create" component={CreateAlarm} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
