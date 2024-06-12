import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import Slider from '@react-native-community/slider';

const PomodoroTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        if (timerRunning && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timeRemaining === 0) {
            setTimerRunning(false);
        }
    }, [timerRunning, timeRemaining]);

    const startTimer = () => {
        setTimerRunning(true);
    };

    const pauseTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setTimeRemaining(0);
        setTimerRunning(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        <View style={styles.timerContainer}>
            <Slider
                style={{width: 200, height: 40}}
                trackStyle={styles.track}
                thumbImage={require('@/assets/images/avocado.png')}
                thumbStyle={styles.thumb}
                minimumTrackTintColor='#a7c99a'
                thumbTouchSize={{ width: 50, height: 40 }}
                minimumValue={0}
                maximumValue={12}
                step={1}
                onValueChange={(value) => setTimeRemaining(value * 5 * 60)}
            />
        <View 
            />
            {timerRunning ? (
                <TouchableOpacity onPress={pauseTimer}>
                    <Ionicons name="pause" size={24} color="black" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={startTimer}>
                    <Ionicons name="play" size={24} color="black" />
                </TouchableOpacity>
            )}
        </View>
        </>
    );
};

const AvocadoStore = () => {
    const [avocadoMoney, setAvocadoMoney] = React.useState(0);

    const handlers = () => {
        console.log('vai para loja');
    };

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
    return (
        <View style={styles.container}>
            <AvocadoStore />
            <Image source={require('@/assets/images/Vovo_juju.png')} style={styles.imageJuju} />
            <PomodoroTimer />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 1,
        borderRadius: 100,
        backgroundColor: '#A7C99A',

    },
    thumb: {
        width: 32,
        height: 38,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    timerContainer: {
        width: '90%',
        maxHeight: 66,
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: '#e4f0e2',
        fontFamily: 'Open Sans',
        color: '#06150080',
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageJuju: {
        width: 210,
        height: 240,
    },
    avocadoStoreContainer: {
        position: 'absolute',
        top: 30,
        left: 15,
    },
    avocadoText: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '400',
        color: '#4E0F09',
        fontFamily: 'Open Sans',
    },
    image: {
        width: 32,
        height: 38,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,
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
