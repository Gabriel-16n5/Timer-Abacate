import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';

export default function LoginScreen() {
  const navigation = useNavigation();
  const navigationHandler = () => {
    navigation.navigate("register")
  }
  const navigationHandlerHome = () => {
    navigation.navigate("home")
  }
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/avocado.png')} style={styles.image} />
      <Text style={styles.title}>Faça seu login para começar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#628754', '#7E9F70']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
        <Button
          onPress={navigationHandlerHome}
          color="transparent"
          title={<Text style={styles.buttonText}>Entrar</Text>}
        />
        </LinearGradient>
        <TouchableOpacity onPress={navigationHandler} style={[styles.button, { backgroundColor: '#fafff9', borderColor: '#7E9F70' }]}>
          <Text style={[styles.buttonText, { color: '#7E9F70' }]}>Criar conta</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.link}>Esqueci minha senha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fafff9',
  },
  image: {
    width: 30,
    height: 36,
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 24,
    fontWeight: '700',
    fontFamily: 'NunitoSans',
  },
  input: {
    width: '100%',
    height: '9%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7E9F70',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontFamily: 'Open Sans',
    color: '#06150080',
    fontSize: 14,
    fontWeight: 600
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  gradientButton: {
    borderRadius: 37,
    overflow: 'hidden',
    width: '100%',
    height: '50%',
    marginBottom: 20,
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    height: '50%',
    borderRadius: 37,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'NunitoSans',
    fontSize: 16,
  },
  link: {
    color: '#061500',
    marginTop: 40,
    fontFamily: 'Open Sans',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
