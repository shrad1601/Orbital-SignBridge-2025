import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { TextInput } from 'react-native-gesture-handler'; //this line caused compile error


import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';


//to output video
//import { Video } from 'expo-av'; man apparently expo-av is deprecated
import { useVideoPlayer, VideoView } from 'expo-video';


import { useRouter } from 'expo-router';

import Toast from 'react-native-toast-message';

//coz i wanna wait for full user input to be typed
import { useDebounce } from "use-debounce";

//so coz its a function, i gotta put it outside my return render section in homescreen
 const SignTranslator = () => {
          const [text, setText] = useState('');
          
          const [videoSource , setVideoSource] = useState(''); //coz MLquery output wld be a string

          const[debouncedText] = useDebounce(text, 500);
          useEffect( () => {
            //i can only fetch when user inputs and i only wanna run fetch after they fully typed
          
            if(debouncedText != '' ) {

              Toast.show({
                          type: 'info',
                          text1: 'Will take some time to load video',
                          text2: 'You will get a msg once video loads!'
                      });

              //man i had to type the whole url coz i am running on simulator & not web
              //fetch(`http://127.0.0.1:5000/outputURL/${text}`).then( 
              //fetch(` https://0b67-218-212-129-135.ngrok-free.app/outputURL/${text}`).then(
              fetch(`http://192.168.10.63:8000/outputURL/${text}`).then( 
                response => {
                  console.log(response);
                  console.log("response status is " + response.status);
                  
                  response.headers.forEach((value,key) => {
                    console.log(`${key}: ${value}`)
                  });

                  return response.text() //coz my response is just a url so i formate as text and not json
                }
                ).then(
                //take the data in text  & set it
                data => {  
                  //oops the url when console comes with a whitespace so cleanit
                  const cleanedURL = data.trim()
                  setVideoSource(cleanedURL)
                  console.log('this is data b4 cleanup' + data)
                  console.log(videoSource)
                  console.log('this is the cleaned url' + cleanedURL)
                }
              )
          }


          //I do ,[debouncedText] so that everytime text changes my useeffect wld be re-rendered
          }, [debouncedText]);


          /*man for expo-vidoe i gotta do a const and again 
          we cant re-render native hooks*/
          const player = useVideoPlayer(videoSource);
          useEffect(() => {
            if(videoSource != '') {

              Toast.show({
                          type: 'info',
                          text1: 'Video has loaded!',
                      });

              console.log("checking inside 2nd use" + videoSource)
              player.loop = true;
              player.play();
              player.muted = true;

              
            }
          }, [videoSource, player]);



          




          return (
            <View style={{padding: 10}}>
              <TextInput 
                style={{height:30, padding:5, backgroundColor: '#96DED1'}}
                placeholder="Type here" //like what my box will default have
                onChangeText={ newText => {
                  setText(newText)}
                }
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


              <View>
                {videoSource ? //empty string evals to false
                  <VideoView
                    //key={videoSource}
                    player={player}
                    style={{ width: '100%', height: 200, marginBottom: 10 }}

                      
                      
                  /> :null
                }
              </View>
          

              
              


              





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
