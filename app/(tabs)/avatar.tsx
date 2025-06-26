//just copied my index home page onto here for ref
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React, { useState } from 'react';


//for avatar dicebear(for now) api
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

//milestone 2-tryna get the avatar customisation available in dicebear






export default function HomeScreen() {
   
    //cannot put javscript const logic insie return block
    
    const [seed, setSeed] = useState('replace this with any name');
    const [svg, setSvg] = useState('');

    const generateAvatar = () => {
      const avatar = createAvatar(lorelei, { seed }).toString();
      setSvg(avatar);
    };
  


  

  
    return ( 
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Select your character! </ThemedText>  
      </ThemedView>
      
            
        
        //for the avatar api
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
            <TextInput
                style={{
                borderColor: 'gray',
                borderWidth: 1,
                padding: 8,
                width: '80%',
                marginBottom: 20,
                }}
                value={seed}
                onChangeText={setSeed}
                placeholder="Enter a name"
            />
            <Button title=
               "Generate Avatar" 
                onPress={generateAvatar} />

            {svg !== '' && (
                <View style={{ marginTop: 20 }}>
                <SvgXml xml={svg} width={150} height={150} />
                </View>
            )}
    </ScrollView>
        






    
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
