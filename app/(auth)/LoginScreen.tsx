import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import TextField from "../components/TextField";
import { useForm, Controller } from "react-hook-form";
import { REGEX } from "@/src/utills/globals";
import CustomButton from "../components/CustomButton";
import Animated, {
    BounceInDown,
    SlideInLeft,
    SlideInRight,
    FadeIn,
    Easing,
} from "react-native-reanimated";





const LoginScreen: React.FC = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all", shouldUnregister: false });

    const Touchable = Animated.createAnimatedComponent(TouchableOpacity);



    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef<any>(null);  // Ref for password input field

    const handleLogin = (data: any) => {
        console.log("Form Data:", data);
    };


    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // google services are available
        } catch (err) {
            console.error('play services are not available');
        }
    };


    return (
        <LinearGradient
            colors={["#263238", "#1C1C1C", "#fff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                // scrollEnabled={scrollEnabled}
                enableResetScrollToCoords={true}
                // extraHeight={50}
                enableOnAndroid={false}
                keyboardShouldPersistTaps={'handled'}
            >
                <Animated.View
                    className="w-full"
                    entering={BounceInDown.duration(800)}
                >
                    <View className="w-full">
                        <View className="bg-white rounded-[12px] mx-5 p-4">
                            <Animated.Text
                                className="text-[32px] my-[16px] font-[Lato-Bold] text-center"
                                entering={BounceInDown.duration(1000).delay(200)}
                            >
                                Login
                            </Animated.Text>

                            <Animated.View entering={SlideInLeft.duration(1200).delay(400)}>
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
                                            onPressLeftIcon={() => console.log("Left Icon Pressed")}
                                            onPressRightIcon={() => setValue("email", "")}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#9E9E9E"
                                            mainClassName={""}
                                            editable={true}
                                            returnKeyType={'next'}
                                            textInputStyle={undefined}
                                            mainContainerStyle={""}
                                            errorMessage={errors.email?.message}
                                            onSubmitEditing={() => {
                                                passwordRef.current?.focus();  // Focus the password field on 'next' key press
                                            }}
                                        />
                                    )}
                                    name="email"
                                />
                            </Animated.View>

                            {/* Password Field */}
                            <Animated.View
                                className="mb-4"
                                entering={SlideInRight.duration(1400).delay(600)}
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
                                            mainClassName={""}
                                            editable={true}
                                            textInputStyle={undefined}
                                            mainContainerStyle={""}
                                            returnKeyType={'done'}

                                            errorMessage={errors.password?.message}
                                            onPressLeftIcon={function (): void {
                                                throw new Error("Function not implemented.");
                                            }} />
                                    )}
                                    name="password"
                                />
                            </Animated.View>
                            <Touchable
                                entering={SlideInLeft.duration(1600).delay(800)}
                                onPress={() => {
                                }}
                                className="absolute right-5 z-10 bottom-[185px]">
                                <Text
                                    className="text-blue-800 text-[14px] font-[Lato-Bold]"
                                >
                                    Forgot Password?
                                </Text>
                            </Touchable>
                            <Animated.View
                                entering={SlideInRight.duration(1800).delay(1000)}>
                                <CustomButton
                                    title="Login"
                                    disabled={!isValid}
                                    onPress={handleSubmit(handleLogin)}
                                />
                            </Animated.View>
                            <View className="items-center m-5" >
                                <Text className="text-[18px] font-[Lato-Bold]" >or</Text>
                            </View>
                            <Animated.View
                                entering={SlideInLeft.duration(2000).delay(1200)}>
                                <CustomButton
                                    title="Sign in with Google"
                                    onPress={handleGoogleLogin}
                                    disabled={false} />
                            </Animated.View>
                        </View>

                    </View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
};

export default LoginScreen;
