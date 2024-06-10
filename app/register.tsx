import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({ value, onChangeText }) => {
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.passwordInputContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Senha"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.visibilityIcon} onPress={togglePasswordVisibility}>
        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#3E5A33" />
      </TouchableOpacity>
    </View>
  );
};

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cancelContainer}>
        <Text style={styles.cancelText}>Cancelar</Text>
        <Image source={require('@/assets/images/avocado.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Usuário"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        secureTextEntry
      />
      <PasswordInput value={undefined} onChangeText={undefined} />
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#628754', '#7E9F70']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Button
            onPress={() => { }}
            color="transparent"
            title={<Text style={styles.buttonText}>Cadastrar</Text>}
          />
        </LinearGradient>
      </View>
      <Text style={styles.link}>Já tenho uma conta</Text>
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
  cancelContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  cancelText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 400,
    color: '#000000',
    fontFamily: 'Open Sans',
  },
  image: {
    width: 30,
    height: 36,
    marginLeft: 75,
  },
  title: {
    width: '100%',
    fontSize: 30,
    marginBottom: 24,
    fontWeight: '700',
    fontFamily: 'NunitoSans',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7E9F70',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Open Sans',
    color: '#06150080',
    fontSize: 14,
    fontWeight: 600
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  gradientButton: {
    borderRadius: 37,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    marginTop: 25,
    justifyContent: 'center'
  },
  button: {
    width: '100%',
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7E9F70',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginTop: 10
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Open Sans',
    color: '#06150080',
    fontSize: 14,
    fontWeight: 600
  },
  visibilityIcon: {
    paddingHorizontal: 10,
  },
});
