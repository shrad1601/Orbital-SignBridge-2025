//just copied my index home page onto here for ref
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
//to output video


//so coz its a function, i gotta put it outside my return render section in homescreen
 const SignTranslator = () => {
          const [text, setText] = useState('');
          return (
            <View style={{padding: 10}}>
              <TextInput 
                style={{height:30, padding:5, backgroundColor: '#96DED1'}}
                placeholder="Type here" //like what my box will default have
                onChangeText={newText => setText(newText)}
                defaultValue={text}
              />

              //i want an outline box
              <View style={{borderWidth: 50, 
                            borderColor: '#96DED1',
                            borderRadius:10, alignContent: 'center', 
                            marginTop: 15
              }}
              >

              <Text style={{padding: 10, fontSize:40, backgroundColor: '#96DED1'}}>
                {text
                  .split(' ')
                  .map(word => word && '🤗')
                  .join(' ')}
              </Text>
            </View>
            </View>
          ); 
        };


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      
      /*i am commenting out this og logo bit coz i dont need it. 
      i also resized ui >parallaxScroll to size 0 so header color doesnt matter*/
      /*headerImage={
        <Image
          style={{ width: 80, height: 100, position: 'absolute', bottom:120 }}
          source= {require('@/assets/images/logo-new.png')}
        />
      }*/>


      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello! </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Input text here!</ThemedText>
        
      
      //gonna input my user textbox here to type the word         
      < SignTranslator/>
      



      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
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
