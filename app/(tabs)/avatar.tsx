//just copied my index home page onto here for ref
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React, { useState } from 'react';


//for avatar dicebear(for now) api
import { adventurer, avataaars, lorelei, micah, openPeeps } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

//milestone 2-tryna get the avatar customisation available in dicebear
import { Picker } from '@react-native-picker/picker';





export default function HomeScreen() {
   
    //cannot put javscript const logic insie return block
    
    const [seed, setSeed] = useState('replace this with any name');
    const [svg, setSvg] = useState('');


    const [styleOpt, setStyleOpt] = useState<any>();
    /*coz right with just styleopt i cant do picker sleection properly
    since i wanna transform styleopt so if i use it in sleectedvalue 
    it causes problems*/
    const [styleStrName, setStyleStrName] = useState('lorelei');

    const generateAvatar = () => {
      if(styleOpt == undefined) {
        const avatar = createAvatar(lorelei, { seed }).toString();
        setSvg(avatar);
      } else {
        const avatar = createAvatar(styleOpt, { seed }).toString();
        setSvg(avatar);
      }
    };

    //man i get issues coz createavatar expects obj like lorelei & nth else
    //so i shall use if-else cond and a func to transform str
    const transform = (styleOpt) => {
      if (styleOpt === 'adventurer') {
        return adventurer;
      } else if (styleOpt === 'micah') {
        return micah;
      } else if (styleOpt === 'openPeeps') {
        return openPeeps;
      } else if (styleOpt === 'avataaars') {
        return avataaars;
      } else {
        return lorelei;
      }
    }
  


  

  
    return ( 
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Select your character! </ThemedText>  

      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Select one of the styles below </ThemedText>  

      </ThemedView>

      <View>
        <Picker
          style={{ flex: 1}}
            selectedValue={styleStrName}
            onValueChange={(itemValue, itemIndex) => {
                setStyleStrName(itemValue)
                setStyleOpt(transform(itemValue))
            }
            }>
            <Picker.Item label="lorelei" value="lorelei" />
            <Picker.Item label="adventurer" value="adventurer" />
            <Picker.Item label="micah" value="micah" />
            <Picker.Item label="openPeeps" value="openPeeps" />
            <Picker.Item label="avataaars" value="avataaars" />
          </Picker>
      </View>
      
            
        
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
