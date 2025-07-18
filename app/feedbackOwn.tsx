/*idea is to create a pg that the home's button links to & i wld use 
react hook form to handle user input and onsubmit send email to me */

//nth



import {
  Image, ImageBackground,
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import ParallaxScrollView from '@/components/ParallaxScrollView';


import React, { useState } from 'react';
//to upload ss
import * as ImagePicker from 'expo-image-picker';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';


//to write the chosen images as file

import Toast from 'react-native-toast-message';

//i am gonna make the textinputs using state a function to be called
const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [descp, setDescp] = useState('');

    const [errors, setErrors] = useState({});

    const [image, setImage] = useState<string[]>([]);

    //using const means it wont get updated properly esp coz update is done in async func
    //thus use usestae
    const [pickerOutput, setPickerOutput] = useState(false);
    const [pickerUriArr, setPickerUriArr] = useState<string[]>([]);
    const [pickerTypeArr, setPickerTypeArr] = useState<string[]>([]);
    const [len, setLen] = useState(0);
    /*let pickerOutput = false; //set to true if output not cancelled
    let pickerUriArr :string[] = [];
    let pickerTypeArr :string[] = [];
    let len = 0;*/


    const chooseImage = async () => {
        let output = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes:['images', 'videos'],
            allowsMultipleSelection: true,
            //allowsEditing: true, 
            selectionLimit: 4,
            aspect: [4,3],
            quality: 1,
            
        });

        console.log(output);

            /*shall loop to display all selected images-but idk how many selected. 
             alt is just apply a map func which wld iterate through all images selected
             in an array*/
            //then the image const shld accept string array instead of string to be stored

        
        if(!output.canceled) {
          setPickerOutput(true);
          console.log("i have set pickeroutput to be " + pickerOutput)
          setLen(output.assets.length);

          const newUriArr: string[] = []
          const newTypeArr: string[] = []

          for(let p =0; p < output.assets.length; p++) {
              
            newUriArr[p]= output.assets[p].uri;      
            newTypeArr[p] = (output.assets[p].type !== undefined
                            ? output.assets[p].type
                            : '') as string;            
          }

          setPickerUriArr(newUriArr);
          setPickerTypeArr(newTypeArr);
              
          setImage(output.assets.map((img) => img.uri));
        }


    };

    //to ensure compulsory fields filled (basically any of the text input)
    const check = () => {
        const newErrors: { text?: string;} = {};
        if (!name) newErrors.text = 'Please fill in the name field';
        if (!email) newErrors.text = 'Please fill in the email field';
        if (!descp) newErrors.text = 'Please fill in the description field';
        setErrors(newErrors);

        console.log("check has been called");

        return Object.keys(newErrors).length == 0;
    }







     //doing formdata to upload uri into server (accesible public url)
     const formdata = new FormData()
     const blobUpload = async () => {
      //only if we even have a pickeroutput aka output not cancelled
      if(pickerOutput){
        for(let p =0; p < len; p++) {
          formdata.append('files', {
            uri: pickerUriArr[p],
            type: pickerTypeArr[p],
            name:`${Date.now()} by ${email}`
          }as any)

          let res = await fetch(
            /*i created an azure storage and then a container within 
            then blob name is like how i wanna name the file upload*/
            `https://feedbackimg.blob.core.windows.net/img-container/${Date.now()}by${email}`,
            {
              method: 'post',
              body: formdata,
              headers: {
              'Content-Type': 'multipart/form-data',
              }
            }
          );

          let responseJson = await res.json();
          console.log("the responsejson is " + responseJson)
          console.log(res.statusText)
        }
      } else {
        console.log("bruh pickeroutput is" + pickerOutput);
      }
    }





    







    return (
        <View>
            <ThemedView style={styles.identiTextContainer}>
                <ThemedText type="title">Name </ThemedText>  
            </ThemedView>

            <View style={{padding:10}}>
                <TextInput 
                style={{height:50, padding:5, backgroundColor: '#5de5ef', borderRadius: 10}}
                placeholder="Type here" 
                onChangeText={newName => setName(newName)}
                defaultValue={name}
                />
            </View> 




            <ThemedView style={styles.identiTextContainer}>
                <ThemedText type="title">Email </ThemedText>  
            </ThemedView>

            <View style={{padding:10}}>
                <TextInput 
                style={{height:50, padding:5, backgroundColor: '#5de5ef', borderRadius: 10}}
                placeholder="Type here" 
                onChangeText={newEmail => setEmail(newEmail)}
                defaultValue={email}
                />
            </View> 



            <ThemedView style={styles.identiTextContainer}>
                <ThemedText type="title">Description </ThemedText>  
            </ThemedView>

            <View style={{padding:10}}>
                <TextInput 
                style={{height:50, padding:5, backgroundColor: '#5de5ef', borderRadius: 10}}
                placeholder="Type here" 
                onChangeText={newDescp => setDescp(newDescp)}
                defaultValue={descp}
                />
            </View> 


            <ThemedView style={styles.identiTextContainer}>
                <ThemedText type="title">Any screenshots to attach </ThemedText>  
            </ThemedView>

            <View style={{padding:10}}>
                <TouchableOpacity onPress={chooseImage}>
                    <Text style = {styles.button}>Choose an image/video to upload</Text>
                     {image.map((uri) => (
                        <Image 
                        key={uri}
                        source={{ uri }} 
                        style={styles.image} 
                        />
                    ))}
                </TouchableOpacity>
            </View> 


            {/*the submit button*/}
            <TouchableOpacity
                style={styles.submit}
                onPress={() => { 
                check();
                console.log('You have pressed the button!');
                
               {/*
                const subj = `feedback from ${name} at ${email}`;
                Linking.openURL(`mailto:e1385469@u.nus.edu?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(descp)}`)
                */}




                console.log('checking pickeroutput after submit ' + pickerOutput);
                 /*ig i gotta do fetch to my mailgun backend using azure web app link
                 for testing purposes
                 TODO GOTTA FIGURE HOW TO DEAL WITH fetch- i mean i just need to trigger the backend*/
                 blobUpload()
                 
                 fetch(`http://192.168.10.63:8001/mail/${name}/${email}/${descp}`).then(
                  response => {
                    try {
                      if(response.ok) {
                      Toast.show({
                        type: 'info',
                        text1: 'Feedback is SUCCESSFULLY sent',
                        });
                      } 
                  } catch(e) {
                      Toast.show({
                        type: 'info',
                        text1: 'Feedback is NOT sent. ' + e,
                        text2: 'Please try again later'
                      });
                    }

                    console.log('fetch is done')
                  }
                ) 






                }}>
                
                <Text style = {styles.bott}>Submit</Text>
                
                   
            </TouchableOpacity>

            

        </View>
    )

}


export default function HomeScreen() {
    return ( 
     
    <View style = {styles.forView}> 
        {/*shld insert my googleform header here-for it to be fixed in pos it shld be outside scrollview component*/}
            <ImageBackground
              style={styles.headerImage}
              source= {require('@/assets/images/header-src-googleforms.png')}>
                <TouchableOpacity style={styles.top}
                   onPress={() => { 
                           console.log('You have pressed the button to back home!');
                           useRouter().push('/(tabs)');     
                          }}>
                    
                    <View style={{flexDirection: 'row'}}>
                        <IconSymbol
                                size={30}
                                color='white'
                                name="chevron.left"
                                style={styles.icon}
                        />   
                        <Text style = {styles.word}>Home</Text>
                    </View>  

                </TouchableOpacity>
            </ImageBackground>
  
        <ScrollView contentContainerStyle={styles.container}>
          
          
          
          


          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">SignBridge feedback </ThemedText>  
          </ThemedView>

           <ThemedView style={styles.stepContainer}>
                   <ThemedText type="subtitle">We would love to hear any feedback you 
                    have so that we can improve your experience on our app!</ThemedText>    

                     <Feedback/>   
            </ThemedView>

            scrollToEnd();





        </ScrollView>

    </View>  
    );
}





const styles = StyleSheet.create({

  forView: {
    flex: 1,
  },

  container: { 
    flexGrow: 1,
    paddingBottom:20,
    
  },

  headerImage: {
    width: '100%',
    height:140,
    resizeMode:'cover',
    //position:'absolute',
    
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom:10,
    marginTop: 8,
    marginLeft:8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    fontSize: 14,
    marginLeft:8,
  },
  
  identiTextContainer: {
    gap: 8,
    marginBottom: 8,
    //fontWeight: 'normal',
    //fontSize: 15
  },

  button: {
    color: '#0066ff',
    fontSize: 16,
    textAlign:'center'

  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  image: {
    width: 200,
    height: 200,
  }, 

  top: {
    color: 'white',
    fontSize: 35,
    left:40,
    top: 80,
    fontWeight:'semibold',
    backgroundColor:'#000000c0',
    //i suppose its fine for the whole stretch to have this transparent thing
    marginRight:100,
    
  },

  word: {
    color: 'white',
    fontSize: 35,
    left:40,
    fontWeight:'semibold',
  },

  icon: {
    fontSize:40,
    left:30,
    fontWeight:'semibold',
    top:7,
  },

  submit: {
    backgroundColor:'#00ffcc',
    borderRadius:15,
    alignItems:'center',  
    justifyContent:'center', 
    width:200,
    height:40,
    marginLeft:110, 
  },

  bott: {
    color:'#191C1C',
    textAlign:'justify',
    fontSize:18,
  }

});


