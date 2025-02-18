import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width - 32; // width - (marginHorizontal * 2)
const SWIPE_THRESHOLD = BUTTON_WIDTH * 0.4;

const SwipeToggleButton = () => {
    const translateX = useSharedValue(0);
    const [checkedIn, setCheckedIn] = useState(false);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.min(Math.max(event.translationX, 0), BUTTON_WIDTH - 54);
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withSpring(BUTTON_WIDTH - 54);
                runOnJS(setCheckedIn)(true);
            } else {
                translateX.value = withSpring(0);
                runOnJS(setCheckedIn)(false);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.track}>
                <Text style={styles.text}>{checkedIn ? 'Check Out' : 'Check In'}</Text>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.thumb, animatedStyle]}>
                        <Text style={styles.arrow}>{checkedIn ? '←' : '→'}</Text>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    track: {
        width: BUTTON_WIDTH,
        height: 46,
        backgroundColor: '#007BFF', // ✅ Blue color
        borderRadius: 22,
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'relative',
    },
    text: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF', // ✅ White text color
    },
    thumb: {
        width: 32,
        height: 32,
        backgroundColor: '#FFF', // ✅ White thumb
        borderRadius: 16,
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    arrow: {
        fontSize: 20, // ✅ Adjusted for better spacing
        color: '#007BFF', // ✅ Blue arrow color
        fontWeight: 'bold',
    },
});

export default SwipeToggleButton;
