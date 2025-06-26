import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';


//to output video
import { Video } from 'expo-av';

import { useRouter } from 'expo-router';


//so coz its a function, i gotta put it outside my return render section in homescreen
 const SignTranslator = () => {
          const [text, setText] = useState('');
          

          const videoSource = require('../../assets/videos/THANK-YOU!.mp4');


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

           {/* <Text style={{padding: 10, fontSize:40, backgroundColor: '#96DED1'}}>
                {text
                  .split(' ')
                  .map(word => word && '🤗')
                  .join(' ')}
              </Text> */}


              //text.trim so that white spaces are not counted
              {text.trim() !== '' &&
               text.trim().split(' ').map((_, index) => (
                <Video
                  key={index}
                  source={videoSource}
                  style={{ width: '100%', height: 200, marginBottom: 10 }}
                  
                  isLooping
                  shouldPlay
                  
                />
          ))}

              
              


              





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





     //gonna do a feedback button-u click on it to directed to gopgle web-form
      <Button
       onPress={() => { 
        console.log('You have pressed the button!');
        //Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfpQz8-DFa6gP4CiN_rLhai7uWLVR7Cp3NyshyxUKug-3UNYw/viewform?usp=preview");
        useRouter().push('/feedbackOwn');
        
    

       }}
       title="Press to give feedback"
       color="#003d99"
       
       
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
