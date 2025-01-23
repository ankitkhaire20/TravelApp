import React, { useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Icon from "../confing";
import Animated, { RotateInUpLeft, RotateInUpRight, SlideInLeft } from 'react-native-reanimated';
import TextField from "../components/TextField";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import { REGEX } from "@/src/utills/globals";
import CustomButton from "../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen: React.FC = () => {
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all", shouldUnregister: false });

    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <SafeAreaView className="flex-1 mx-4 bg-gray-100">
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >


                {/* Form Container */}
                <Animated.View
                    className="border border-gray-300 p-4 mt-28 rounded-lg shadow-md bg-white"
                    entering={RotateInUpRight.duration(1000)}
                >
                    {/* Header */}
                    <Animated.View className="items-center">
                        <Text className="text-2xl font-bold">Sign up now</Text>
                        <Text className="text-base mt-3 text-gray-500">
                            Please fill in the details to create your account
                        </Text>
                    </Animated.View>

                    {/* Input Fields */}
                    <Animated.View className="mt-6"

                    >
                        {/* Name Field */}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Name is required",
                                },
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Name"
                                    value={value}
                                    rightIcon="close"
                                    onChangeText={onChange}
                                    onPressRightIcon={() => setValue("name", "")}
                                    placeholder="Enter your name"
                                    placeholderTextColor="#9E9E9E"
                                    errorMessage={errors.name?.message}
                                    editable={true}
                                    onSubmitEditing={() => {
                                        emailRef.current.focus();
                                    }}
                                    returnKeyType="next" mainClassName={""}
                                    onPressLeftIcon={function (): void {
                                        throw new Error("Function not implemented.");
                                    }}
                                    textInputStyle={undefined}
                                    mainContainerStyle={""} inputView={""} />
                            )}
                            name="name"
                        />
                    </Animated.View>

                    {/* Email Field */}
                    <Animated.View className="mt-4">
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email is required",
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
                                    onChangeText={onChange}
                                    returnKeyType="next"
                                    onSubmitEditing={() => {
                                        passwordRef.current.focus();
                                    }}
                                    onPressRightIcon={() => setValue("email", "")}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9E9E9E"
                                    errorMessage={errors.email?.message}
                                    editable={true} mainClassName={""} onPressLeftIcon={function (): void {
                                        throw new Error("Function not implemented.");
                                    }} textInputStyle={undefined} mainContainerStyle={""} inputView={""} />
                            )}
                            name="email"
                        />
                    </Animated.View>

                    {/* Password Field */}
                    <Animated.View className="mt-4">
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Password"
                                    value={value}
                                    ref={passwordRef}
                                    returnKeyType="done"
                                    rightIcon={showPassword ? "eyeoff" : "eyeOn"}
                                    onChangeText={onChange}
                                    secureTextEntry={!showPassword}
                                    onPressRightIcon={() => setShowPassword(!showPassword)}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9E9E9E"
                                    errorMessage={errors.password?.message}
                                    editable={true} mainClassName={""} onPressLeftIcon={function (): void {
                                        throw new Error("Function not implemented.");
                                    }} textInputStyle={undefined} mainContainerStyle={""} inputView={""} />
                            )}
                            name="password"
                        />
                    </Animated.View>

                    {/* Submit Button */}
                    <Animated.View className="mt-6 flex-row justify-between ">

                        <CustomButton
                            title="Cancel"
                            onPress={() => {
                                router.replace('/LoginScreen')
                            }}

                            disabled={false}
                            textinPutStyle="text-black"
                        />
                        <CustomButton
                            title="Sign up"
                            onPress={handleSubmit(onSubmit)}
                            disabled={!isValid}
                            textinPutStyle="text-black"
                        />
                    </Animated.View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
