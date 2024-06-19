import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const PomodoroTimer = ({ onReset, onComplete, onDesist }) => {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(true);
    const [stopModalVisible, setStopModalVisible] = useState(false);

    useEffect(() => {
        if (timerRunning && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timeRemaining === 0 && timerRunning) {
            setTimerRunning(false);
            setSliderVisible(true);
            onComplete();
        }
    }, [timerRunning, timeRemaining]);

    const startTimer = () => {
        if (timeRemaining > 0) {
            setTimerRunning(true);
            setSliderVisible(false);
        }
    };

    const pauseTimer = () => {
        setTimerRunning(false);
        setSliderVisible(true);
        setStopModalVisible(true);
    };

    const resetTimer = () => {
        setTimeRemaining(0);
        setTimerRunning(false);
        setSliderVisible(true);
        setStopModalVisible(false);
        onReset();
        onDesist();
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
                {sliderVisible && (
                    <Slider
                        style={{ width: 200, height: 40 }}
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
                )}
                {timerRunning ? (
                    <TouchableOpacity onPress={pauseTimer}>
                        <View style={{ backgroundColor: '#89362e', borderRadius: 50, padding: 5 }}>
                            <Ionicons name="stop" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={startTimer}>
                        <View style={{ backgroundColor: '#89362e', borderRadius: 50, padding: 5 }}>
                            <Ionicons name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={stopModalVisible}
                onRequestClose={() => {
                    setStopModalVisible(!stopModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.buttonClose, { alignSelf: 'flex-start' }]}
                            onPress={() => setStopModalVisible(!stopModalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Tem certeza que vai desistir bem?</Text>
                        <Text style={styles.modalTextBody}>Cuidado, se desistir vai perder um abacate. Como assim não gosta de abacate?</Text>
                        <TouchableOpacity onPress={resetTimer} style={styles.desistirButton}>
                            <Text style={styles.desistirButtonText}>Desistir</Text>
                        </TouchableOpacity>
                        <Image source={require('@/assets/images/juju_Desistir.png')} style={styles.imageOverlay} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const AvocadoStore = ({ avocadoMoney, setSelectedImage }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [halfModalVisible, setHalfModalVisible] = useState(false);

    return (
        <View style={styles.avocadoStoreContainer}>
            <TouchableOpacity style={styles.avocadoContainer} onPress={() => setHalfModalVisible(true)}>
                <TouchableOpacity style={styles.imageTouchable} onPress={() => setModalVisible(true)}>
                    <Image source={require('@/assets/images/avocado.png')} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.avocadoText}>{avocadoMoney}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.buttonClose, { alignSelf: 'flex-start' }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Para que servem os abacates?</Text>
                        <Text style={styles.modalTextBody}>Além de fazer bem e deixar o cabelo bonito, os abacates servem como moedas, ou seja, a cada timer completo você ganha um, porém se nao terminar vai perder abacate bem.</Text>
                        <Image source={require('@/assets/images/Abacates.png')} style={styles.imageOverlay} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={halfModalVisible}
                onRequestClose={() => {
                    setHalfModalVisible(!halfModalVisible);
                }}
            >
                <View style={styles.halfCenteredView}>
                    <View style={styles.halfModalView}>
                        <TouchableOpacity
                            style={[styles.buttonClose, { alignSelf: 'flex-start' }]}
                            onPress={() => setHalfModalVisible(!halfModalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.imageRow}>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/Vovo_juju.png')); }}>
                                <Image source={require('@/assets/images/Vovo_juju.png')} style={styles.smallImage} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/MC_juju.png')); }}>
                                <Image source={require('@/assets/images/MC_juju.png')} style={styles.smallImage} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/Pato_Juju.png')); }}>
                                <Image source={require('@/assets/images/Pato_Juju.png')} style={styles.smallImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default function SplashScreen() {
    const [avocadoMoney, setAvocadoMoney] = useState(0);
    const [selectedImage, setSelectedImage] = useState(require('@/assets/images/Vovo_juju.png'));

    const handleReset = () => {
        console.log("Teste");
    };

    const handleComplete = () => {
        setAvocadoMoney(prevMoney => prevMoney + 1);
    };

    const handleDesist = () => {
        setAvocadoMoney(prevMoney => prevMoney - 1);
    };

    return (
        <View style={styles.container}>
            <AvocadoStore avocadoMoney={avocadoMoney} setSelectedImage={setSelectedImage} />
            <Image source={selectedImage} style={styles.imageJuju} resizeMode="contain" />
            <PomodoroTimer onReset={handleReset} onComplete={handleComplete} onDesist={handleDesist} />
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
        borderRadius: 8,
        borderColor: '#A7C99A',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    timerText: {
        fontFamily: 'Open Sans',
        fontWeight: '300',
        fontSize: 50,
        color: '#1b3810',
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
    imageTouchable: {
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: "#defbd9",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    halfCenteredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    halfModalView: {
        width: '100%',
        height: '45%',
        borderTopLeftRadius: 50, 
        borderTopRightRadius: 50, 
        backgroundColor: "#f4e3e1",
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '700',
        color: '#1F371B',
        fontFamily: 'Nunito Sans',
    },
    modalTextBody: {
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '400',
        color: '#1F371B',
        fontFamily: 'Open Sans',
    },
    imageOverlay: {
        width: 380,
        height: 228,
        position: 'absolute',
        bottom: 0
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    smallImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafff9'
    },
    desistirButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    desistirButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageJuju: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
});

export default SplashScreen;
