//aka shrad's app.js to connect everything in auth
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './forgotPassword';
import LoginPage from './login';
import ResetPasswordScreen from './resetPass';
import SignupPage from './signUpPg';
//import VoiceScreen from './voicescreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Signup Page"
          component={SignupPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Reset Password"
          component={ResetPasswordScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Voice"
          component={VoiceScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}