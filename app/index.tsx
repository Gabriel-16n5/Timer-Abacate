import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from '../components/navigation/SplashScreen'; // Certifique-se de que o caminho está correto

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