//just copied my index home page onto here for ref
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React from 'react';
import { Button } from 'react-native';

 


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >


      
    {/*i need 2 sections: delete account and log out*/} 
    
    <Button 
        onPress={() => {
        console.log("to delete");
        }}
        title="Delete account"
        style={styles.stepContainer}
        color="#6807f7"
        
        
     />

     <Button 
        onPress={() => {
        console.log("to log out");
        }}
        title="Log out"
        style={styles.stepContainer} 
        color="#6807f7"
     />
     




      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});