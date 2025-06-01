//just copied my index home page onto here for ref
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React from 'react';
import { Button } from 'react-native';

//gotta get login to be able to do logout
import { useRouter } from 'expo-router';
 
import Toast from 'react-native-toast-message';

export default function HomeScreen() {

  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >


      
    {/*i need 2 sections: delete account and log out*/} 
    
    <Button 
        onPress={async () => {
        console.log("to log out");
        //await logout();
        useRouter().replace('/login');

        }}
        title="Log out"
        //style={styles.stepContainer} 
        color="#6807f7"
     />




    <Button 
        onPress={() => {
        console.log("to delete");
        Toast.show({
            type: 'info',
            text1: 'Account will be deleted',
        });
        
        }}
        title="Delete account"
        //style={styles.stepContainer}
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