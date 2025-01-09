import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
    title: string,
    onPress: () => void;
    disabled: boolean
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {

    const { title, onPress, disabled } = props
    return (
        <View>
            <TouchableOpacity onPress={onPress} disabled={disabled}
                className={`rounded-[10px] ${disabled ? "bg-gray-400" : "bg-[#24BAEC]"}`}>
                <Text className="text-white p-4 text-[16px] text-center">
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default CustomButton;