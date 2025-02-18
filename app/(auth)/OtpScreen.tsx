import { Font } from "@/src/utills/globals";
import React, { useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { BounceInLeft, BounceInRight, SlideInLeft, SlideInRight } from "react-native-reanimated";
import useAuthStore from "../state/auth";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

const OtpScreen: React.FC = () => {
    const { authDetails } = useAuthStore();
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const { isLogin, setIsLogin } = useAuthStore();
    const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: otp, setValue: setOtp });

    function handlePress1(): void {
        router.replace('/(auth)/LoginScreen');
    }

    function handleVerifyOtp() {
        setIsLogin(true)

        console.log("Entered OTP:", otp);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View style={styles.halfView}>
                <Animated.View
                    style={styles.firstHalf}
                    entering={SlideInLeft.duration(1200)}
                />
                <Animated.View
                    style={styles.secondHalf}
                    entering={SlideInRight.duration(1200).delay(400)}
                />
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContainer}>

                <Animated.View style={styles.card}
                    entering={BounceInLeft.duration(1000).delay(200)}>
                    <Animated.Text style={styles.title} entering={BounceInLeft.duration(1200).delay(400)}>
                        OTP Verification
                    </Animated.Text>
                    <Animated.Text style={styles.subtitle} entering={BounceInRight.duration(1400).delay(300)}>
                        Please enter the OTP sent to your email
                    </Animated.Text>
                    <Animated.View entering={BounceInLeft.duration(1600).delay(400)} style={{ marginVertical: 10 }}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={otp}
                            onChangeText={setOtp}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.otpInput}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.cell,
                                        isFocused && styles.cellFocused,
                                    ]}
                                    entering={BounceInRight.duration(800).delay(index * 100)}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    <Text style={styles.cellText}>{symbol || " "}</Text>
                                </Animated.View>
                            )}
                        />
                    </Animated.View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <Animated.View style={styles.buttonWrapper} entering={BounceInRight.duration(1800).delay(600)}>
                            <CustomButton title="Verify OTP" onPress={handleVerifyOtp} />
                        </Animated.View>
                        <Animated.View style={styles.buttonWrapper} entering={BounceInLeft.duration(2000).delay(800)}>
                            <CustomButton title="Go back" onPress={handlePress1} />
                        </Animated.View>
                    </View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    halfView: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    firstHalf: {
        flex: 1,
        backgroundColor: "white",
    },
    secondHalf: {
        flex: 1,
        backgroundColor: "#1e40af",
    },
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: Dimensions.get("window").width - 40,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: Font.LATO_BOLD,
        textAlign: "center",
    },
    subtitle: {
        marginVertical: 10,
        color: "grey",
        textAlign: "center",
        fontSize: 16,
    },
    otpInput: {
        width: "80%",
        marginBottom: 20,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cell: {
        width: 50,
        height: 55,
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
    },
    cellText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    cellFocused: {
        borderColor: "#1e40af",
        backgroundColor: "#eff6ff",
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        width: '40%',
    }
});

export default OtpScreen;
