import { Font, REGEX } from "@/src/utills/globals";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { BounceInLeft, BounceInRight, RollInLeft, RollInRight, FlipInEasyX, SlideInLeft, SlideInRight } from "react-native-reanimated";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const SignUpScreen: React.FC = () => {
    const {
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange", shouldUnregister: false });

    const lastNameRef = useRef<any>(null);
    const emailRef = useRef<any>(null);

    const onSubmit = (data: any) => {
        console.log("Form Submitted:", data);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {/* Background Animation */}
            <View style={styles.halfView}>
                <Animated.View
                    style={styles.firstHalf}
                    entering={SlideInLeft.duration(1200).delay(200)}
                />
                <Animated.View
                    style={styles.secondHalf}
                    entering={SlideInRight.duration(1200).delay(400)}
                />
            </View>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>

                    {/* Title & Subtitle */}
                    <Animated.View style={styles.textViewContainer}
                        entering={BounceInLeft.duration(1400)}
                    >
                        <Text style={styles.title}>Sign up now</Text>
                        <Text style={styles.subtitle}>
                            Please fill up the details and create an account
                        </Text>
                    </Animated.View>

                    {/* First Name Field */}
                    <Animated.View entering={RollInLeft.duration(1600)}>
                        <Controller
                            control={control}
                            name="firstName"
                            rules={{ required: { value: true, message: "First name is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="First Name"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your first name"
                                    placeholderTextColor="#9E9E9E"
                                    returnKeyType="next"
                                    onSubmitEditing={() => lastNameRef?.current?.focus()}
                                    errorMessage={errors.firstName?.message}
                                    editable={true}
                                />
                            )}
                        />
                    </Animated.View>

                    {/* Last Name Field */}
                    <Animated.View entering={RollInRight.duration(1600)}>
                        <Controller
                            control={control}
                            name="lastName"
                            rules={{ required: { value: true, message: "Last name is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Last Name"
                                    ref={lastNameRef}
                                    value={value}
                                    returnKeyType="next"
                                    onChangeText={onChange}
                                    placeholder="Enter your last name"
                                    placeholderTextColor="#9E9E9E"
                                    errorMessage={errors.lastName?.message}
                                    onSubmitEditing={() => emailRef?.current?.focus()}
                                />
                            )}
                        />
                    </Animated.View>

                    {/* Email Field */}
                    <Animated.View entering={RollInLeft.duration(1600)}>
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email is Required",
                                },
                                pattern: {
                                    value: REGEX.EMAIL,
                                    message: "Please enter a valid email",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Email"
                                    value={value}
                                    rightIcon="close"
                                    ref={emailRef}
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
                                />
                            )}
                            name="email"
                        />
                    </Animated.View>

                    {/* Sign Up Button */}
                    <Animated.View entering={BounceInRight.duration(1800)}>
                        <CustomButton
                            title="Sign Up"
                            onPress={handleSubmit(onSubmit)}
                            disabled={!isValid}
                        />
                    </Animated.View>

                    {/* Sign In Redirect */}
                    <View style={{ marginVertical: 5 }} />
                    <Animated.View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                        entering={BounceInLeft.duration(1800)}
                    >
                        <Text style={{ textAlign: "center" }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace('/LoginScreen')}>
                            <Text style={{ color: "#1e40af", fontWeight: "bold" }}>Sign in</Text>
                        </TouchableOpacity>
                    </Animated.View>

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
    textViewContainer: {
        marginVertical: 12,
        alignItems: "center",
    },
});

export default SignUpScreen;
