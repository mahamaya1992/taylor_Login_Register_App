import { Dimensions, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../../Constants/Fonts'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../Constants/Colors'
import { Container, Icon } from 'react-native-basic-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast'
import Storage, { setAccount } from '../../Utils/Storage'
import { setUser } from '../../Redux/reducer/User'
import { useDispatch } from 'react-redux'

const { height } = Dimensions.get('screen')

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const submitData = async () => {
    if (!validateEmail(email)) {
      Toast.show('Please Fill valid email', Toast.SHORT, Toast.BOTTOM);
      return;
    }
    if (password.length < 6) {
      Toast.show('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmpassword) {
      Toast.show('Password dose not match');
      return false;
    }

    let data = {
      name: name,
      email: email,
      password: password,
    }

    try {
      const existingUser = await Storage.get(email);

      if (existingUser) {
        alert('User already exists. Please choose a different username.');
        return;
      }

      await Storage.set(email, data);
      await setAccount(data)
      dispatch(setUser(data))
      alert('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  }

  return (

    <Container style={{
      backgroundColor: '#fff'
    }}>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={true}

      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          height: height / 3,
          marginTop: 30
        }}>
          <Image
            source={require('../../Assets/images/signUp.jpg')}
            style={{
              height: 190,
              width: 190,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>

        <Text style={{
          ...styles.login_text, color: COLORS.textColor,
        }}>Sign Up</Text>

        <TextInput
          label="Name"
          placeholder='Name'
          placeholderTextColor={'#c4c3c2'}
          style={styles.text_view}
          value={name}
          onChangeText={value => setName(value)}
        />
        <TextInput
          label="Email"
          placeholder='Email'
          placeholderTextColor={'#c4c3c2'}
          style={{ ...styles.text_view, marginTop: 20 }}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <View style={{
          flexDirection: 'row',
          ...styles.text_view,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TextInput
            label="Password"
            placeholder='Password'
            placeholderTextColor={'#c4c3c2'}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={value => setPassword(value)}
          />

          <TouchableOpacity onPress={togglePasswordVisibility}>

            <Icon name={passwordVisible ? 'eye-with-line' : 'eye'} type='Entypo' size={18} color="black" />
          </TouchableOpacity>

        </View>
        <TextInput
          label="Confirm Password"
          placeholder='Confirm Password'
          placeholderTextColor={'#c4c3c2'}
          style={{ ...styles.text_view, marginTop: 20 }}
          value={confirmpassword}
          onChangeText={value => setConfirmPassword(value)}
          secureTextEntry={!passwordVisible}
        />

        <Pressable onPress={submitData}
          style={styles.logIn_view}>

          <Text style={{
            color: COLORS.cardColor,
            fontFamily: FONTS.medium,
            fontSize: 12

          }}>
            SIGN UP
          </Text>
        </Pressable>

        <View
          style={{
            height: height / 5,
            justifyContent: 'flex-end',
          }}
        >
          <Text style={styles.account_text}>
            Already have an account? {''}
            <Text onPress={() => navigation.navigate('Login')}
              style={styles.account_text_sing}>
              Login
            </Text>
          </Text>

        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default SignUp

const styles = StyleSheet.create({
  login_text: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    alignSelf: 'center',
    // marginTop: 20
  },
  text_view: {
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 15,
    borderRadius: 5,
    padding: 5,
    marginTop: 30,
    height: 50
  },
  logIn_view: {
    backgroundColor: '#7d50a1',
    height: 45,
    marginHorizontal: 15,
    marginTop: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'

  },
  account_text: {
    color: COLORS.textColor,
    fontFamily: FONTS.regular,
    fontSize: 10,
    alignSelf: 'center',
    bottom: 30,
    // marginTop: 80
  },
  account_text_sing: {
    color: '#7d50a1',
    fontFamily: FONTS.medium,
    fontSize: 10,
    alignSelf: 'center',
    // bottom: 30,
    textDecorationLine: 'underline'
    // marginTop: 80
  }
})