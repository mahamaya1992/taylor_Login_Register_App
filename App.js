import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './App/Navigation/AppStack';
import AuthStack from './App/Navigation/AuthStack';
import { getAccount } from './App/Utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './App/Redux/reducer/User';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch()
  const { login_status } = useSelector(state => state.User)
  const [loader, setLoader] = useState(true)

  const checkUser = async () => {
    let result = await getAccount();

    if (result) {
      dispatch(setUser(result))
    }
    setLoader(false)
  }

  useEffect(() => {
    checkUser()

  }, [])

  if (loader) return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }}>
    <ActivityIndicator
      color={'#000'}
      size={'small'}
    />
  </View>
  return (
    <View
      style={{
        flex: 1
      }}
    >
      
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName='AuthStack'
          >
            {
              !login_status ?
                <Stack.Screen name="AuthStack" component={AuthStack} />
                :
                <Stack.Screen name="AppStack" component={AppStack} />
            }
          </Stack.Navigator>
        </NavigationContainer>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})