/*import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';


import { useRouter } from 'expo-router';


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CORRECT_EMAIL = 'Test@example.com';
  const CORRECT_PASSWORD = '123456';








  const handleLogin = () => {
    if (email !== CORRECT_EMAIL || password !== CORRECT_PASSWORD) {
      setError('Invalid email or password');
    } else {
      setError('');
      console.log('Login successful!');
      // Optionally clear inputs or navigate
     
     
     useRouter().replace('/(tabs)');
      


    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo-new.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>SignBridge</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter your email ID or Username"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.buttonWrapper}>
          <Button
            title="Sign in"
            onPress={handleLogin}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    borderColor: '#999999',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4fb9af',
  },
  buttonWrapper: {
    marginTop: 30,
    width: '80%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#4fb9af',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginTop: 0,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: -18,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});
*/



      import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [passwordRaw, setPasswordRaw] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  const CORRECT_EMAIL = 'Test@example.com';
  const CORRECT_PASSWORD = '123456';

  const handleLogin = () => {
    if (email !== CORRECT_EMAIL || passwordRaw !== CORRECT_PASSWORD) {
      setError('Invalid email or password');
    } else {
      setError('');
      console.log('Login successful!');
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo-new.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>SignBridge</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Enter your email ID or Username"
          value={email}
          onChangeText={setEmail}
        />

        {/* Real input (invisible) */}
        <TextInput
          ref={inputRef}
          value={passwordRaw}
          onChangeText={setPasswordRaw}
          style={styles.hiddenInput}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
        />

        {/* Fake visible password dots */}
        <Pressable
          style={styles.input}
          onPress={() => inputRef.current && inputRef.current.focus()}
        >
          <Text style={{ fontSize: 18, color: '#000' }}>
            {'•'.repeat(passwordRaw.length)}
          </Text>
        </Pressable>

        <View style={styles.buttonWrapper}>
          <Button title="Sign in" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    top: 200,
    left: '10%',
    width: '80%',
    height: 50,
    opacity: 0,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#999999',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4fb9af',
  },
  buttonWrapper: {
    marginTop: 30,
    width: '80%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#4fb9af',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginTop: 0,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: -18,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});
