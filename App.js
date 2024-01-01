/* Hello stranger */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import MyTabBar from './src/components/bottomTab';


export default function App() {

  return (

      <NavigationContainer>
        <MyTabBar/>
      </NavigationContainer>
    
  );
}