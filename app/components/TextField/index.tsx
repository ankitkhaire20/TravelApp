import Icon from "@/app/confing";
import React from "react";
import { ReturnKeyTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";


interface TextFieldProps {
    label: string;
    editable: boolean,           // Label for the input field
    mainClassName: string;       // Class name for the wrapper view
    leftIcon?: string;            // Icon name for the left icon
    rightIcon?: string;           // Icon name for the right icon
    onPressLeftIcon: () => void; // Function to handle left icon press
    onPressRightIcon: () => void; // Function to handle right icon press
    secureTextEntry?: boolean;   // Optional boolean to toggle secure text entry (for password fields)
    ref?: React.RefObject<TextInput>; // Optional ref for accessing the TextInput
    value?: string;              // Optional value for TextInput
    onChangeText?: (text: string) => void;  // Optional callback for handling text change
    keyboardAppearance?: 'light' | 'dark';  // Optional to control the keyboard appearance
    onSubmitEditing?: () => void;
    textInputStyle: any;
    mainContainerStyle: string;
    errorMessage: any;
    returnKeyType?: ReturnKeyTypeOptions;
    placeholder: string;
    placeholderTextColor: string // Optional callback for when submit editing happens
    inputView: string
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
        <View className={`w-full h-[108px] ${mainContainerStyle}`}>
            <View>
                {label && <Text className="text-[18px] font-[Lato-Bold] mb-2" >
                    {label}:
                </Text>}
            </View>
            <View className={`flex-row items-center border-[1px] px-2 rounded-[12px]  ${inputView} `}>
                {leftIcon &&
                    <TouchableOpacity onPress={onPressLeftIcon}>
                        <Icon name={leftIcon} size={22} />
                    </TouchableOpacity>
                }
                <TextInput
                    ref={ref}
                    className={`flex-1 text-[18px] px-[11px] py-[11px]  ${textInputStyle}`}
                    value={value}
                    returnKeyType={returnKeyType}
                    placeholder={placeholder}
                    editable={editable}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}

                />
                {rightIcon?.length !== 0 && value && (
                    <TouchableOpacity onPress={onPressRightIcon} >
                        <Icon name={rightIcon} size={22} />
                    </TouchableOpacity>
                )}
            </View>
            <View className="my-[5px]" >
                {parsedErrorMessage && <Text className="text-[14px]  color-red-700" >
                    {parsedErrorMessage}
                </Text>}
            </View>
        </View>
    )
})

export default TextField;