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
                        maximumTrackTintColor='white'
                        thumbTouchSize={{ width: 50, height: 40 }}
                        minimumValue={0}
                        maximumValue={12}
                        step={1}
                        onValueChange={(value) => setTimeRemaining(value * 5 * 60)}
                    />
                )}
                {timerRunning ? (
                    <TouchableOpacity onPress={pauseTimer}>
                        <View style={{ backgroundColor: '#89362e', borderRadius: 50, padding: 5}}>
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
                            <Text style={styles.textStyleX}>X</Text>
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
                            <Text style={styles.textStyleX}>X</Text>
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
                            <View style={styles.barrinha}></View>
                        </TouchableOpacity>
                        <View style={styles.imageRow}>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/Vovo_juju.png')); }}>
                                <View style={[styles.imageContainer, { backgroundColor: '#cddeca' }]}>
                                    <Image source={require('@/assets/images/Vovo_juju.png')} style={styles.smallImage} />
                                    <Text style={styles.imageText}>Vovó juju</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/MC_juju.png')); }}>
                                <View style={[styles.imageContainer, { backgroundColor: '#dec3b4' }]}>
                                    <Image source={require('@/assets/images/MC_juju.png')} style={styles.smallImage} />
                                    <Text style={styles.imageText}>MC juju</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelectedImage(require('@/assets/images/Pato_Juju.png')); }}>
                                <View style={[styles.imageContainer, { backgroundColor: '#b6b4de' }]}>
                                    <Image source={require('@/assets/images/Pato_Juju.png')} style={styles.smallImage} />
                                    <Text style={styles.imageText}>Pato juju</Text>
                                </View>
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
    barrinha: {
        width: 118,
        height: 8,
        backgroundColor: '#b4908c',
        borderRadius: 100,
        marginLeft: '90%'
    },

    track: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#A7C99A',
    },
    thumb: {
        width: 32,
        height: 38,
        backgroundColor: 'rgba(255, 255, 255, 0)',
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
        borderColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#e4f0e2'
    },
    timerText: {
        fontFamily: 'OpenSans',
        fontWeight: 'regular',
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
        fontWeight: 'regular',
        color: '#4E0F09',
        fontFamily: 'OpenSans',
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
        padding: 15,
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
        height: '40%',
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
        
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyleX: {
        color: "#1f371b",
        textAlign: "center",
        fontSize: 26,
        marginLeft: 310
    },
    modalText: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1F371B',
        fontFamily: 'NunitoSans',
        lineHeight: 40
    },
    modalTextBody: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'regular',
        color: '#1F371B',
        fontFamily: 'OpenSans',
        lineHeight: 30
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
        width: 90,
        height: 140,
        resizeMode: 'contain'
    },
        imageContainer: {
        width: 93,
        height: 180,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
        imageText: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        color: '#5A312C',
        textAlign: 'center',
        paddingVertical: 5,
        fontWeight: 'regular',
        fontFamily: 'NunitoSans',
        fontSize: 16
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    desistirButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: 140,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    desistirButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageJuju: {
        width: 270,
        height: 270,
        resizeMode: 'contain'
    },
});

export default SplashScreen;
