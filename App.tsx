import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ManageListsScreen from './src/screens/ManageListsScreen'
import HomeScreen from './src/screens/HomeScreen'
import { AppContextProvider } from './src/context/AppContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {StyleSheet, StatusBar} from 'react-native';

const Stack = createStackNavigator()

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    }
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="manage-lists" component={ManageListsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}