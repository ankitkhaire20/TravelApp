import React, { useRef, useState } from "react";
import { Dimensions, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { REGEX } from "@/src/utills/globals";
import CustomButton from "../components/CustomButton";
import TextField from "../components/TextField";
import Animated, {
    BounceInDown,
    BounceInLeft,
    BounceInRight,
    SlideInLeft,
    SlideInRight,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import useAuthStore from "../state/auth";
const Touchable = Animated.createAnimatedComponent(TouchableOpacity);

const LoginScreen: React.FC = () => {
    const {
        control,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all", shouldUnregister: false });

    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<any>(null);
    const { setAuthDetails } = useAuthStore()

    const router = useRouter();

    const handleLogin = (data: any) => {
        console.log("Form Data:", data);
        router.push('/OtpScreen')
        setAuthDetails(data);
    };

    const handleGoogleLogin = async () => {
        try {
            console.log("Google Sign-In Triggered");
        } catch (err) {
            console.error("Google Sign-In Error", err);
        }
    };

    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View className="absolute inset-0 flex-row">
                <Animated.View
                    className="flex-1 bg-white"
                    entering={BounceInLeft.duration(3000).duration(200)}
                />
                <Animated.View
                    className="flex-1 bg-blue-800"
                    entering={BounceInRight.duration(3200).delay(400)}
                />
            </View>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Animated.View
                    className={`bg-white rounded-lg p-4 shadow-lg w-[90%]`}
                >
                    <Animated.Text
                        className={'text-[32px] my-4 text-center font-[Lato-Bold]'}
                        entering={BounceInDown.duration(3400).delay(800)}
                    >
                        Login
                    </Animated.Text>
                    <Animated.View
                        entering={BounceInLeft.duration(3600).delay(1000)}
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
                                        setValue("email", "")
                                        trigger("email")
                                    }}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9E9E9E"
                                    editable={true}
                                    returnKeyType="next"
                                    errorMessage={errors.email?.message}
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                    mainClassName={""}
                                    onPressLeftIcon={function (): void {
                                        throw new Error("Function not implemented.");
                                    }}
                                    textInputStyle={undefined}
                                    mainContainerStyle={""} inputView={""} />
                            )}
                            name="email"
                        />
                    </Animated.View>
                    {/* Password Field */}
                    <Animated.View
                        className={'mb-4'}
                        entering={BounceInRight.duration(3800).delay(1200)}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: JSON.stringify([{ valid: false, title: "Password is Required" }]),
                                },
                                minLength: {
                                    value: 6,
                                    message: JSON.stringify([{ valid: false, title: "Password must be at least 6 characters" }]),
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Password"
                                    value={value}
                                    ref={passwordRef}
                                    rightIcon={showPassword ? "eyeoff" : "eyeOn"}
                                    onChangeText={onChange}
                                    secureTextEntry={!showPassword}
                                    onPressRightIcon={() => setShowPassword(!showPassword)}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9E9E9E"
                                    editable={true}
                                    leftIcon="lock"
                                    returnKeyType="done"
                                    errorMessage={errors.password?.message}
                                    mainClassName={""}
                                    onPressLeftIcon={function (): void {
                                    }}
                                    textInputStyle={undefined} mainContainerStyle={""} inputView={""} />
                            )}
                            name="password"
                        />
                    </Animated.View>

                    {/* Forgot Password */}
                    <Touchable
                        entering={BounceInLeft.duration(4000).delay(1400)}
                        onPress={() => router.replace('/ForgotPasswordScreen')}
                        className={'items-end bottom-6'}
                    >
                        <Text style={{ color: "blue", fontSize: 14, fontWeight: "bold" }}>
                            Forgot Password?
                        </Text>
                    </Touchable>

                    {/* Login Button */}
                    <Animated.View entering={BounceInRight.duration(4200).delay(1600)}>
                        <CustomButton
                            title="Login"
                            disabled={!isValid}
                            onPress={handleSubmit(handleLogin)}
                            textinPutStyle={""} />
                    </Animated.View>
                    <View className="items-center my-4">
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>or</Text>
                    </View>
                    <Animated.View entering={BounceInLeft.duration(4400).delay(1800)}>
                        <CustomButton
                            title="Sign in with Google"
                            onPress={handleGoogleLogin}
                            disabled={false}
                            textinPutStyle="text-[#000000]"
                        />
                    </Animated.View>
                    <Animated.View
                        entering={BounceInRight.duration(4600).delay(2000)}
                        className="items-center mt-6"
                    >
                        <Touchable
                            onPress={() => router.replace('./SignUpScreen')}
                        >
                            <Text style={{ fontSize: 16, }}>
                                Don't have an account?
                                <Text className="text-blue-700 font-[Lato-Bold]">  Sign Up</Text>
                            </Text>
                        </Touchable>
                    </Animated.View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </View >
    );
};

export default LoginScreen;
