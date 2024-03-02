import { Alert, Button, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/reducer/User';
import { setAccount } from '../../Utils/Storage';
import Toast from 'react-native-simple-toast'
import { Card, Container, Icon, StatusBar, Text } from 'react-native-basic-elements';
import { COLORS } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

const { height } = Dimensions.get('screen')

const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.User);
  const alertFunc = () => {
    Alert.alert('Log Out', 'Do you want to Logout ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => logoutUser() },
    ]);
  };

  const logoutUser = async () => {
    dispatch(logout())
    setAccount(null)
    Toast.show('Logged Out Successfully', Toast.LONG);
  };


  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='dark-content'
      />
      <View style={styles.welcome_main_view}>
        <Text style={styles.welcome_text}>
          Welcome To Home
        </Text>
        <TouchableOpacity onPress={alertFunc}
          style={styles.pressble_view}
        >
          <Icon
            name='logout'
            type='AntDesign'
            size={18}
            color={'red'}

          />
        </TouchableOpacity>

      </View>
      <Text
     style={styles.success_message} 
      >Login Successfully !!</Text>
      <Card style={styles.card_view}>
        <Text style={styles.result_text}>
          User Name : {userData?.name}
        </Text>
        <Text style={{ ...styles.result_text, marginTop: 10 }}>
          Email : {userData?.email}
        </Text>
        <Text style={{ ...styles.result_text, marginTop: 10 }}>
          Password : {userData?.password}
        </Text>
      </Card>
    </Container>
  )
}

export default Home

const styles = StyleSheet.create({
  welcome_main_view: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  welcome_text: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#a754eb'
  },
  pressble_view: {
    position: 'absolute',
    right: 18
  },
  result_text: {
    fontFamily: FONTS.regular,
    fontSize: 12
  },
  card_view: {
    backgroundColor: COLORS.primaryThemeColor,
    marginHorizontal: 15,
    height: 120,
    elevation: 5,
    paddingHorizontal: 15
  },
  success_message:{
    fontFamily: FONTS.semibold,
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 16
  }
})