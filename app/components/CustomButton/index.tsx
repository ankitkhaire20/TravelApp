import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
    title: string,
    onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {

    const { title, onPress } = props
    return (
        <View>
            <TouchableOpacity onPress={onPress}
                className="bg-[#24BAEC] rounded-[10px]">
                <Text className="text-white p-4 text-[16px] text-center">{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default CustomButton;