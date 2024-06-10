import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from '../components/navigation/SplashScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});