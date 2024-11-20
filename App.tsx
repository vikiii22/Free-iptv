import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ManageListsScreen from './src/screens/ManageListsScreen'
import HomeScreen from './src/screens/HomeScreen'
import { AppContextProvider } from './src/context/AppContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, StatusBar, Button } from 'react-native'

const Stack = createStackNavigator()

export default function App() {
  const defaultOptions = {
    headerShown: true,
    headerStatusBarHeight: 10
  }

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
                options={({ navigation }) => ({
                  ...defaultOptions,
                  headerRight: () => (
                    <Button
                      title="Live"
                      onPress={() => navigation.navigate('Free IPTV')}
                    />
                  ),
                  headerLeft: () => (
                    <Button
                      title="Mi Cuenta"
                      onPress={() => navigation.navigate('Mi Cuenta')}
                    />
                  )
                })}
                name="Mis Listas"
                component={ManageListsScreen}
              />
              <Stack.Screen
                options={({ navigation }) => ({
                  ...defaultOptions,
                  headerRight: () => (
                    <Button
                      title="Mis Listas"
                      onPress={() => navigation.navigate('Mis Listas')}
                    />
                  ),
                  headerLeft: () => (
                    <Button
                      title="Free IPTV"
                      onPress={() => navigation.navigate('Free IPTV')}
                    />
                  )
                })}
                name="Mi Cuenta"
                component={ManageListsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}