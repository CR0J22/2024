import React from 'react';

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Todo from '../pages/todo';
import Timer from '../pages/timer';



const Tab = createBottomTabNavigator();

export default function MyTabBar() {

  return (
    <Tab.Navigator
      initialRouteName={"Todo"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#005404',
        tabBarStyle: {
          position: 'absolute',
          bottom: 22,
          height: 65,

        },
      }}
    >
      <Tab.Screen
        options={{

          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialIcons name="timer" color={color} size={size} />
              <Text style={{ color: color, fontSize: 14, fontWeight:'bold' }}>Timer</Text>
            </View>
          ),
        }}
        name="Timer"
        component={Timer}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome5 name="clipboard-list" color={color} size={size}/>
              <Text style={{ color: color, fontSize: 14, fontWeight:'bold' }}>Metas</Text>
            </View>
          ),
        }}
        name="Todo"
        component={Todo}

      />

    </Tab.Navigator>
  );
}
