import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';

export default function ForgotPassword() {

    const [emailagain, setEmailag] = useState(''); // for recovery email
    const [error , setError] = useState('')
    const [msg, setMsg] = useState('');



    function handlePasswordReset() {
  fetch('http://192.168.10.63:5000/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailagain
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log('probably sent reset code')  // still testing
      setMsg('Reset code sent! (check console for now)')
      setError('')
    })
    .catch(function (err) {
      console.log('forgot pwd error:', err)
      setError('error sending code, try again?')
      setMsg('')
    })
}

    

    return (

  <View style={{ flex: 1 }}> 

   
    <View style={styles.header}> 
      <Image //logo
        source={require('@/assets/images/logo-new.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={styles.appName}>SignBridge</Text> 
    </View>

    
    <View style={styles.container}>
      
      <Text style={styles.title}>Forgot Password Page</Text> 

      
      <TextInput 
        style={styles.input}
        placeholder="Enter your email" 
        value={emailagain}            
        onChangeText={setEmailag}     
      />
    </View>

    <Button
  title="Send Password reset link"
  onPress={handlePasswordReset} // to be written
/>

<Button
  title="Go back to login page"
  onPress={() =>  useRouter().push('/login')} // to be written
/>

{error !== '' && <Text style={styles.errorText}>{error}</Text>}
{msg !== '' && <Text style={styles.successText}>{msg}</Text>}


  </View>
)
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4fb9af',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4fb9af',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#999999',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});