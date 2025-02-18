import React, { useRef, useState } from "react";
import { FlatList, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import CustomButton from "../components/CustomButton";
import { Color } from "@/src/utills/globals";
import { useRouter } from "expo-router";
import useOnBoardingStore from "../state/OnBoarding";

const { width, height } = Dimensions.get('window');

const data = [
    {
        id: "1",
        text: "Life is Short and the world is wide.",
        text1: "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world",
    },
    {
        id: "2",
        text: "It’s a big world out there, go explore.",
        text1: "To get the best of your adventure, you just need to leave and go where you like. We are waiting for you.",
    },
    {
        id: "3",
        text: "People don’t take trips, trips take people.",
        text1: "To get the best of your adventure, you just need to leave and go where you like. We are waiting for you.",
    },
];

const IntroScreen: React.FC = () => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { setOnBoarding } = useOnBoardingStore();
    const translateX = useSharedValue(0);

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / width);
        setCurrentIndex(newIndex);
    };

    const renderIndicators = () => {
        return (
            <View className="flex-row mt-4">
                {data.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentIndex(index);
                            if (flatListRef.current) {
                                flatListRef.current.scrollToIndex({
                                    index: Math.min(index, data.length - 1),
                                    animated: true
                                });
                            }
                        }}
                        activeOpacity={0.7}
                    >
                        <View
                            style={{
                                width: currentIndex === index ? 35 : 15,
                                height: 8,
                                borderRadius: 10,
                                marginHorizontal: 5,
                                backgroundColor: currentIndex === index ? Color.PRMARY_COLOR : "#ccc",
                            }}
                        >
                            {/* Hidden Text to Prevent "Text Strings" Warning */}
                            <Text style={{ display: "none" }}>{index}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const imageWidth = width - 40;
        const imageHeight = height * 0.5;

        return (
            <View className="w-screen items-center my-5">
                <Image
                    source={
                        index === 0
                            ? require('../../assets/images/1.png')
                            : index === 1
                                ? require('../../assets/images/2.png')
                                : require('../../assets/images/3.png')
                    }
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                        resizeMode: "cover",
                        borderRadius: 10,
                    }}
                />
                <Animated.View className="items-center mt-[40px] mx-[33px]">
                    <Text className="font-[Lato-Bold] text-center text-[30px]">
                        {item.text}
                    </Text>
                    <Text className="text-[#7D848D] font-[Poppins] my-[20px] text-center text-[16px]">
                        {item.text1}
                    </Text>
                </Animated.View>
                {/* Adjusted spacing dynamically */}
                <View style={{ marginTop: height * 0.02 }}>{renderIndicators()}</View>
            </View>
        );
    };

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: Math.min(currentIndex + 1, data.length - 1),
                    animated: true,
                });
            }
        } else {
            setOnBoarding(true);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                />
            </ScrollView>
            <View className="mx-[20] bottom-5">
                <CustomButton
                    onPress={handleNext}
                    title={currentIndex === 0 ? "Let's Go!" : currentIndex === 1 ? "Next" : "Done"}
                    disabled={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default IntroScreen;
