import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ManageListsScreen from './src/screens/ManageListsScreen'
import HomeScreen from './src/screens/HomeScreen'
import { AppContextProvider } from './src/context/AppContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, StatusBar, Button } from 'react-native'
import config from "./config.json"

const Stack = createStackNavigator()

export default function App() {
  const defaultOptions = {
    headerShown: false,
    headerStatusBarHeight: 10
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: config.theme.colors.secondary // for status bar too
    }
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Free IPTV">
              <Stack.Screen
                options={({ navigation }) => ({
                  ...defaultOptions,
                  headerLeft: () => (
                    <Button
                      title="Mis Listas"
                      onPress={() => navigation.navigate('Mis Listas')}
                    />
                  ),
                  headerRight: () => (
                    <Button
                      title="Mi Cuenta"
                      onPress={() => navigation.navigate('Mi Cuenta')}
                    />
                  )
                })}
                name="Free IPTV"
                component={HomeScreen}
              />
              <Stack.Screen
                options={({}) => ({
                  headerShown: false
                })}
                name="Mis Listas"
                component={ManageListsScreen}
              />
              <Stack.Screen
                options={({}) => ({
                  headerShown: false
                })}
                name="Mi Cuenta"
                component={ManageListsScreen}
              />
              <Stack.Screen
                options={({}) => ({
                  presentation: 'modal'
                })}
                name="modal"
                component={ManageListsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}