import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
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
        <Button title="Entrar" onPress={() => { }} color="#34A853" />
        <TouchableOpacity onPress={() => { }} style={styles.outlinedButton}>
          <Text style={styles.outlinedButtonText}>Criar conta</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fafff9',
  },
  image: {
    width: 30,
    height: 36,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 24,
    fontWeight: 700,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#34A853',
    backgroundColor: 'transparent',
    padding: 10,
  },
  outlinedButtonText: {
    color: '#34A853',
  },
  link: {
    color: '#007BFF',
    marginTop: 16,
  },
});
