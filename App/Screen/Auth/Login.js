import { Dimensions, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../../Constants/Fonts'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../Constants/Colors'
import { Container, Icon } from 'react-native-basic-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast'
import Storage, { setAccount } from '../../Utils/Storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/reducer/User'


const { height, width } = Dimensions.get('screen')

const Login = () => {
     const dispatch = useDispatch();
     const navigation = useNavigation()
     const [loader, setLoader] = useState(false);
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('');
     const [passwordVisible, setPasswordVisible] = useState(false);

     const togglePasswordVisibility = () => {
          setPasswordVisible(!passwordVisible);
     };

     const validateEmail = (email) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(email);
     };

     const submitHandler = async () => {
          if (!validateEmail(email)) {
               Toast.show('Please Fill valid email', Toast.SHORT, Toast.BOTTOM);
               setLoader(false);
               return;
          }
          if (password.length < 6) {
               Toast.show('Password must be at least 6 characters long');
               setLoader(false);
               return;
          }
          
          const existingUser = await Storage.get(email);
          if (existingUser) {
               // console.log("existingUser", existingUser);
               if (existingUser.password == password) {

                    await setAccount(existingUser)
                    dispatch(setUser(existingUser))
               } else {
                    alert('Invalid username or password');
               }
          } else {
               alert('User not found. Please register.');
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
                         marginTop: 10
                    }}>
                         <Image
                              source={require('../../Assets/images/loginh.png')}
                              style={styles.main_image}
                         />
                    </View>

                    <Text style={{
                         ...styles.login_text, color: COLORS.textColor,
                    }}>Login</Text>

                    <TextInput
                         label="Email"
                         placeholder='Email'
                         placeholderTextColor={'#c4c3c2'}
                         value={email}
                         onChangeText={value => setEmail(value)}
                         style={styles.text_view}
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

                    <Pressable onPress={submitHandler}
                         style={styles.logIn_view}>

                         <Text style={{
                              color: COLORS.cardColor,
                              fontFamily: FONTS.medium,
                              fontSize: 12

                         }}>
                              LOGIN
                         </Text>

                    </Pressable>

                    <View
                         style={{
                              height: height / 5,
                              justifyContent: 'flex-end',
                         }}
                    >
                         <Text style={styles.account_text}>
                              Didn’t have an account? {''}
                              <Text onPress={() => navigation.navigate('SignUp')}
                                   style={styles.account_text_sing}>
                                   Sign Up
                              </Text>
                         </Text>


                    </View>
               </KeyboardAwareScrollView>
          </Container>
     )
}

export default Login

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
     },
     main_image: {
          height: 250,
          width: 250,
          resizeMode: 'contain',
          alignSelf: 'center'
     }
})