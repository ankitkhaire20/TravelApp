import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "../confing";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Animated, {
    SlideInLeft,
    SlideInRight,
    SlideInUp,
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSequence,
    RotateInDownLeft,
    RotateInUpLeft,
    RotateInUpRight,
    BounceInLeft
} from "react-native-reanimated";
import TextField from "../components/TextField";
import { REGEX } from "@/src/utills/globals";
import CustomButton from "../components/CustomButton";

const ForgotPasswordScreen: React.FC = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all", shouldUnregister: false });

    const handlePress = (data: any) => {
        // Handle reset password logic here
    };

    // Hover-like animation for the button
    const buttonScale = useSharedValue(1);
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }],
    }));

    const onButtonHover = () => {
        buttonScale.value = withSequence(
            withTiming(1.1, { duration: 200 }),
            withTiming(1, { duration: 200 })
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Back Button */}
                <Animated.View
                    entering={SlideInLeft.duration(600)}
                    className="mt-2 ml-5"
                >
                    <TouchableOpacity
                        onPress={() => {
                            router.replace("./LoginScreen");
                        }}
                    >
                        <Icon name="leftarrow" size={24} color="black" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Centered Content */}
                <Animated.View
                    className="flex-1 justify-center items-center mx-5 mb-24"
                    entering={RotateInUpRight.duration(1000)}
                >
                    {/* Form Box */}
                    <Animated.View
                        className="shadow-lg border border-gray-300 rounded-lg p-5 bg-white w-full max-w-md"
                        entering={FadeIn.duration(800).delay(200)}
                    >
                        {/* Title */}
                        <Animated.View
                            entering={SlideInRight.duration(800).delay(400)}
                            className="items-center mb-5"
                        >
                            <Text className="text-2xl font-bold text-black">Forgot Password</Text>
                            <Text className="mt-3 text-base text-center text-gray-500 mx-5">
                                Enter your email account to reset your password
                            </Text>
                        </Animated.View>

                        {/* Email Input */}
                        <Animated.View
                            entering={SlideInLeft.duration(900).delay(600)}
                            className="mb-0"
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
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        label="Email"
                                        value={value}
                                        rightIcon="close"
                                        onChangeText={onChange}
                                        onPressRightIcon={() => setValue("email", "")}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#9E9E9E"
                                        editable={true}
                                        returnKeyType="next"
                                        errorMessage={errors.email?.message}
                                        mainClassName=""
                                        onPressLeftIcon={function (): void {
                                            throw new Error("Function not implemented.");
                                        }}
                                        textInputStyle={undefined}
                                        mainContainerStyle=""
                                        inputView=""
                                    />
                                )}
                            />
                        </Animated.View>

                        {/* Reset Password Button */}
                        <Animated.View
                            entering={SlideInRight.duration(900).delay(800)}

                        >
                            <CustomButton
                                title="Reset Password"
                                onPress={() => {
                                    handleSubmit(handlePress)();
                                    onButtonHover(); // Trigger hover effect
                                }}
                                disabled={!isValid}
                            />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
