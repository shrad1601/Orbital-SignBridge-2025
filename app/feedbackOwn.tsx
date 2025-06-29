/*idea is to create a pg that the home's button links to & i wld use 
react hook form to handle user input and onsubmit send email to me */




import {
  Image, ImageBackground,
  Linking,
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



//i am gonna make the textinputs using state a function to be called
const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [descp, setDescp] = useState('');

    const [errors, setErrors] = useState({});

    const [image, setImage] = useState<string[]>([]);

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

        if(!output.canceled) {
            /*shall loop to display all selected images-but idk how many selected. 
             alt is just apply a map func which wld iterate through all images selected
             in an array*/
            //then the image const shld accept string array instead of string to be stored
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
        return Object.keys(newErrors).length == 0;
    }


    //the submitting process
    







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


            //the submit button
            <TouchableOpacity
                style={styles.submit}
                onPress={() => { 
                check;
                console.log('You have pressed the button!');
                

                const subj = `feedback from ${name} at ${email}`;
                Linking.openURL(`mailto:e1385469@u.nus.edu?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(descp)}`)
                







                }}>
                
                <Text style = {styles.bott}>Submit</Text>
                
                   
            </TouchableOpacity>

            

        </View>
    )

}


export default function HomeScreen() {
    return ( 
     
    <View style = {styles.forView}> 
        //shld insert my googleform header here-for it to be fixed in pos it shld be outside scrollview component
            <ImageBackground
              //style={{ width: 80, height: 100, position: 'absolute', bottom:120 }}
              style={styles.headerImage}
              source= {require('@/assets/images/header-src-googleforms.png')}>
                <TouchableOpacity style={styles.top}
                   onPress={() => { 
                           console.log('You have pressed the button!');
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


