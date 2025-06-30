import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPass, setNewPass] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')

  function handleResetSubmit() {
    
    fetch('http://192.168.10.63:5000/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        code: code,
        newPassword: newPass
      })
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        setOk('Password reset done!')
        setErr('')
        console.log('password updated?')
      })
      .catch(function (error) {
        console.log('reset error:', error)
        setErr('Something went wrong')
        setOk('')
      })
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email again"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter the 6-digit reset code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPass}
        onChangeText={setNewPass}
        secureTextEntry
      />

      <Button title="Submit Reset" onPress={handleResetSubmit} />

      {err !== '' && <Text style={styles.error}>{err}</Text>}
      {ok !== '' && <Text style={styles.success}>{ok}</Text>}
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4fb9af',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  success: {
    color: 'green',
    marginTop: 14,
    fontSize: 16,
  }
});