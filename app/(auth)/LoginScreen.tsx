import React, { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
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
const Touchable = Animated.createAnimatedComponent(TouchableOpacity);

const LoginScreen: React.FC = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all", shouldUnregister: false });

    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<any>(null);
    const screenWidthMinus20 = Dimensions.get('window').width;

    const handleLogin = (data: any) => {
        console.log("Form Data:", data);
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
            {/* Background Layers */}
            <View className="absolute inset-0 ">
                <Animated.View
                    className="flex-1 bg-white"
                    entering={BounceInLeft.duration(1000).duration(200)}
                />
                <Animated.View
                    className="flex-1 bg-blue-800"
                    entering={BounceInRight.duration(1200).delay(400)}
                />
            </View>

            {/* Login Container */}
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
                    entering={BounceInDown.duration(1400).delay(600)}
                >
                    <Animated.Text
                        className={'text-[32px] my-4 text-center font-[Lato-Bold]'}
                        entering={BounceInDown.duration(1600).delay(800)}
                    >
                        Login
                    </Animated.Text>
                    <Animated.View
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
                                    onChangeText={onChange}
                                    onPressRightIcon={() => setValue("email", "")}
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
                                    textInputStyle={undefined} mainContainerStyle={""} />
                            )}
                            name="email"
                        />
                    </Animated.View>
                    {/* Password Field */}
                    <Animated.View
                        className={'mb-4'}
                        entering={BounceInRight.duration(2000).delay(1200)}
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
                                    returnKeyType="done"
                                    errorMessage={errors.password?.message}
                                    mainClassName={""}
                                    onPressLeftIcon={function (): void {

                                    }}
                                    textInputStyle={undefined} mainContainerStyle={""} />
                            )}
                            name="password"
                        />
                    </Animated.View>

                    {/* Forgot Password */}
                    <Touchable
                        entering={BounceInLeft.duration(2200).delay(1400)}
                        onPress={() => console.log("Forgot Password Pressed")}
                        className={'items-end bottom-6'}
                    >
                        <Text style={{ color: "blue", fontSize: 14, fontWeight: "bold" }}>
                            Forgot Password?
                        </Text>
                    </Touchable>

                    {/* Login Button */}
                    <Animated.View entering={BounceInRight.duration(2400).delay(1600)}>
                        <CustomButton
                            title="Login"
                            disabled={!isValid}
                            onPress={handleSubmit(handleLogin)}
                            textinPutStyle={""} />
                    </Animated.View>

                    {/* Separator */}
                    <View className="items-center my-4">
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>or</Text>
                    </View>

                    {/* Google Sign-In Button */}
                    <Animated.View entering={BounceInRight.duration(2600).delay(1800)}>
                        <CustomButton
                            title="Sign in with Google"
                            onPress={handleGoogleLogin}
                            disabled={false}
                            textinPutStyle="text-[#000000]"
                        />
                    </Animated.View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </View >
    );
};

export default LoginScreen;
