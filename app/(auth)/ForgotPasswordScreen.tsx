import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Animated, {
    BounceInLeft,
    BounceInRight
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Font, REGEX } from "@/src/utills/globals";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";

const ForgotPasswordScreen: React.FC = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        shouldUnregister: false,
        defaultValues: {
            email: ""
        }
    });

    const handlePress = (data: any) => {
        console.log("Reset password requested for:", data.email);
        // Implement password reset logic here
    };

    const handlePress1 = () => {
        router.replace('/(auth)/LoginScreen')
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View style={styles.halfView}>
                <Animated.View
                    style={styles.firstHalf}
                    entering={BounceInLeft.duration(1000)}
                />
                <Animated.View
                    style={styles.secondHalf}
                    entering={BounceInRight.duration(1200).delay(400)}
                />
            </View>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.card}>
                    <Animated.View entering={BounceInLeft.duration(1400).delay(600)}>
                        <Text style={styles.title}>Forgot Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your email to reset your password
                        </Text>
                    </Animated.View>
                    <Animated.View
                        style={{ width: '100%' }}
                        entering={BounceInLeft.duration(1800).delay(1000)}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: JSON.stringify([{ valid: false, title: "Email is Required" }]),
                                },
                                pattern: {
                                    value: REGEX.EMAIL,
                                    message: JSON.stringify([{ valid: false, title: "Please Enter a valid email" }]),
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Email"
                                    value={value}
                                    rightIcon="close"
                                    leftIcon="mail"
                                    onChangeText={onChange}
                                    onPressRightIcon={() => {
                                        setValue("email", "");
                                        trigger("email");
                                    }}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9E9E9E"
                                    editable={true}
                                    returnKeyType="done"
                                    errorMessage={errors.email?.message}
                                    onPressLeftIcon={() => { }}
                                />
                            )}
                            name="email"
                        />
                    </Animated.View>
                    <View style={{
                        flexDirection: 'row', width: '100%',
                        justifyContent: 'space-between'
                    }} >
                        <Animated.View
                            style={{ width: '40%' }}
                            entering={BounceInRight.duration(2400).delay(1600)}>
                            <CustomButton
                                title="Reset Password"
                                disabled={!isValid}
                                onPress={handleSubmit(handlePress)}
                            />
                        </Animated.View>
                        <Animated.View
                            style={{ width: '40%' }}
                            entering={BounceInLeft.duration(2600).delay(1600)}>

                            <CustomButton
                                title="Go back"
                                onPress={handlePress1}
                            />
                        </Animated.View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    halfView: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
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
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
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
        textAlign: 'center',
    },
    subtitle: {
        marginVertical: 10,
        color: "grey",
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;
