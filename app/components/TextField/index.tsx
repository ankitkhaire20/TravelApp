import Icon from "@/app/confing";
import React from "react";
import { ReturnKeyTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TextFieldProps {
    label?: string;
    editable?: boolean;
    mainClassName?: string;
    leftIcon?: string;
    rightIcon?: string;
    onPressLeftIcon?: () => void;
    onPressRightIcon?: () => void;
    secureTextEntry?: boolean;
    ref?: React.RefObject<TextInput>;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardAppearance?: 'light' | 'dark';
    onSubmitEditing?: () => void;
    textInputStyle?: any;
    mainContainerStyle?: string;
    errorMessage?: any;
    returnKeyType?: ReturnKeyTypeOptions;
    placeholder?: string;
    placeholderTextColor?: string;
    inputView?: string;
}

const TextField = React.forwardRef<TextInput, TextFieldProps>((props, ref) => {
    const { label, leftIcon, rightIcon,
        onPressLeftIcon, editable,
        mainContainerStyle, inputView,
        onPressRightIcon, returnKeyType,
        textInputStyle, errorMessage, placeholder,
        onChangeText, onSubmitEditing, value,
        secureTextEntry, } = props;

    let parsedErrorMessage: string | null = null;
    if (errorMessage) {
        try {
            const parsedArray = JSON.parse(errorMessage);
            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                parsedErrorMessage = parsedArray[0].title; // Extract `title` field from the first object
            }
        } catch (error) {
            console.error("Error parsing errorMessage JSON:", error);
        }
    }

    return (
        <View className={`w-full ${mainContainerStyle}`}>
            {label && <Text className="text-[16px] font-[Lato-Bold] mb-2">{label}:</Text>}

            <View className={`flex-row items-center bg-gray-200 rounded-[8px] ${inputView} mb-1`}>
                {leftIcon && (
                    <TouchableOpacity onPress={onPressLeftIcon} style={{ paddingLeft: 10 }}>
                        <Icon name={leftIcon} size={22} />
                    </TouchableOpacity>
                )}

                <TextInput
                    ref={ref}
                    className={`flex-1 text-[16px] px-[11px] py-[10px] ${textInputStyle}`}
                    value={value}
                    returnKeyType={returnKeyType}
                    placeholder={placeholder}
                    editable={editable}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}
                />

                {rightIcon?.length !== 0 && value && (
                    <TouchableOpacity onPress={onPressRightIcon} style={{ paddingRight: 5 }}>
                        <Icon name={rightIcon} size={22} />
                    </TouchableOpacity>
                )}
            </View>

            {/* ✅ Reserved space to prevent UI jump */}
            <View style={{ minHeight: 18, marginVertical: 5 }}>
                {parsedErrorMessage && (
                    <Text className="text-[14px] text-red-700">{parsedErrorMessage}</Text>
                )}
            </View>
        </View>
    );
});

export default TextField;
