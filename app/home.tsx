import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const AvocadoStore = () => {
    const [avocadoMoney, setAvocadoMoney] = React.useState(0);
  
    const handlers = () => {
        console.log('vai para loja')
    }

    return (
      <View style={styles.avocadoStoreContainer}>
        <TouchableOpacity style={styles.avocadoContainer} onPress={handlers}>
          <Image source={require('@/assets/images/avocado.png')} style={styles.image} />
          <Text style={styles.avocadoText}>{avocadoMoney}</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <AvocadoStore/>
    </View>
  );
}

const styles = StyleSheet.create({
    avocadoStoreContainer: {
        position: 'absolute',
        top: 30,
        left: 15,
    },
    avocadoText: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 400,
        color: '#4E0F09',
        fontFamily: 'Open Sans',
      },
    image: {
        width: 32,
        height: 38,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10
      },
   avocadoContainer: {
    height: 35,
    width: 105,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#b3b8b1',
    backgroundColor: '#cddeca',
    },
  container: {
    flex: 1,
    backgroundColor: '#fafff9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});