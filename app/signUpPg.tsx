import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenum] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconf, setPasswordconf] = useState('');
    const [error, setError] = useState('');
    const passwordspcheck = /[!@#$%^&*]/;
    const passwordupcheck = /[A-Z]/;
    const digits = /[0-9]/;
    const small = /[a-z]/;


    const router = useRouter();

    function handleSignup() {
        if (email !== email2) {
            setError("Emails don't match!");
        } else if (password !== passwordconf) {
            setError("Passwords don't match!");
        } else if (!passwordspcheck.test(password) || 
            !passwordupcheck.test(password)) {
                setError("Password must have at least one uppercase letter and 1 special character!");
            } else if (!digits.test(password) || !small.test(password)) {
                setError("Password must have at least 1 lowercase letter and 1 number")
            }
        else {
            setError('');
            //return console.log("Signup succesful!");

            fetch('http://192.168.10.63:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'signup ok') {
                    alert('Signup successful! Please log in.');
                    router.push('/login');
                } else {
                    setError(data.message || 'Signup failed');
                }
            })
            .catch(() => setError('Network error. Please try again.'));

        }
    }
    return (
        <View style = {styles.forView}>


        <ScrollView contentContainerStyle={styles.container}> 

            <View style={styles.header}>
                <Image
                    source={require('@/assets/images/logo-new.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>SignBridge</Text>
            </View>

            <Text style={styles.title}>Sign Up Page</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter your full name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Please create a username"
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter your phone number"
                value={phonenumber}
                onChangeText={setPhonenum}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter your email"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Re-enter Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Please re-enter your email"
                value={email2}
                onChangeText={setEmail2}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Please create your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Password Again</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter your password again"
                value={passwordconf}
                onChangeText={setPasswordconf}
                secureTextEntry
            />

            {error !== '' && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.buttonWrapper}>
                <Button title="Register" onPress={handleSignup } />
            </View>
        </ScrollView>

        </View>
    )
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
    label: {
        width: '80%',
        marginTop: 15,
        marginBottom: 2,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    container: {
        //flex: 1,
        flexGrow:1,
        paddingBottom:90,

        justifyContent: 'flex-start',
        alignItems: 'center',
        //paddingTop: 40,
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

     forView: {
    flex: 1,
  },
});