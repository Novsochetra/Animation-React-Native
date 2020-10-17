import React, {ReactElement, useState, useRef} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'

const PADDING = 15
const INPUT_WIDTH = Dimensions.get('window').width - 100

export const Homework1 = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordFieldRef = useRef(null)

  const onSubmitForm = (): void => {
    Alert.alert('Login Success')
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logoImg} />
      <TextInput
        style={styles.input}
        value={email}
        returnKeyType="next"
        placeholder="email"
        numberOfLines={1}
        autoFocus
        onChangeText={(text: string) => setEmail(text)}
        onEndEditing={() => passwordFieldRef?.current?.focus?.()}
      />
      <TextInput
        ref={passwordFieldRef}
        value={password}
        placeholder="password"
        returnKeyType="done"
        style={styles.input}
        numberOfLines={1}
        onEndEditing={onSubmitForm}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={onSubmitForm} activeOpacity={0.9}>
        <Text>Login</Text>
      </TouchableOpacity>

      <View style={styles.footerWrapper}>
        <Text style={styles.dontHaveAccountText}>
          Don't have account? <Text style={styles.signUpText}>sign up now</Text>
        </Text>
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </View>

      <Text style={styles.termAndConditionText}>Term and conditions</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: PADDING,
  },

  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    width: INPUT_WIDTH,
    height: 40,
    marginBottom: PADDING,
    backgroundColor: '#ffffff',
    color: 'gray',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  loginBtn: {
    width: INPUT_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    height: 40,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  footerWrapper: {
    alignItems: 'center',
    marginVertical: PADDING,
  },

  dontHaveAccountText: {
    color: 'gray',
  },

  signUpText: {
    color: 'lightblue',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },

  forgotPasswordText: {
    marginTop: PADDING,
    color: 'lightblue',
  },

  termAndConditionText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },

  logoImg: {
    width: 100,
    height: 100,
    marginBottom: PADDING * 2,
  },
})
