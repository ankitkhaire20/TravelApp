import React, { useRef, useState } from "react";
import { FlatList, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import Animated, { Easing, SlideInLeft, useSharedValue } from "react-native-reanimated";
import Intro1 from '../../assets/images/Intro1.svg';
import Intro2 from '../../assets/images/Intro2.svg';
import Intro3 from '../../assets/images/Intro3.svg';
import CustomButton from "../components/CustomButton";
import { Color } from "@/src/utills/globals";
import { useRouter } from "expo-router";
import useOnBoardingStore from "../state/OnBoarding";

const data = [
    {
        id: "1",
        text: "Life is Short and the world is wide.",
        text1:
            "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world",
    },
    {
        id: "2",
        text: "It’s a big world out there go explore.",
        text1:
            "To get the best of your adventure you just need to leave and go where you like. we are waiting for you.",
    },
    {
        id: "3",
        text: "People don’t take trips, trips take people.",
        text1:
            "To get the best of your adventure you just need to leave and go where you like. we are waiting for you.",
    },
];


const IntroScreen: React.FC = () => {

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const width = Dimensions.get('window').width;

    const router = useRouter();
    const { isOnBoarding, setOnBoarding } = useOnBoardingStore();

    const traslateX = useSharedValue(0);



    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / width);
        setCurrentIndex(newIndex)
    }


    const renderIndicators = () => {
        return (
            <View className="flex-row" >
                {data.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentIndex(index);
                            if (flatListRef.current) {
                                flatListRef.current.scrollToIndex({
                                    index: Math.min(index, data.length - 1),
                                    animated: true
                                })
                            }
                        }}
                        activeOpacity={0.7}
                    >
                        <View
                            style={{
                                width: currentIndex === index ? 35 : 15, // Make the active dot longer
                                height: 8,
                                borderRadius: 10,
                                marginHorizontal: 5,
                                backgroundColor: currentIndex === index ? Color.PRMARY_COLOR : "#ccc", // Active and inactive color
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View className='w-screen items-center my-5' >
                {index === 0 && <Intro1 />}
                {index === 1 && <Intro2 />}
                {index === 2 && <Intro3 />}
                <Animated.View
                    layout={SlideInLeft.duration(1000).easing(Easing.bounce)}
                    className="items-center mt-[40px] mx-[33px]" >
                    <Text className="font-[Lato-Bold] text-center text-[30px]">
                        {item.text}
                    </Text>
                    <Text className="text-[#7D848D] font--[Poppins-Bold]
                     my-[20px] text-center text-[16px]">
                        {item.text1}
                    </Text>
                </Animated.View>
                {renderIndicators()}
            </View >
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
        <SafeAreaView className="flex-1 bg-white" >
            <FlatList
                renderItem={renderItem}
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                decelerationRate={'fast'}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
            />
            <View className="mx-[20] bottom-5" >
                <CustomButton
                    onPress={handleNext}
                    title={currentIndex === 0 ? "Let's Go!" : currentIndex === 1 ?
                        'Next' : "Done"}
                />
            </View>
        </SafeAreaView>
    )
}

export default IntroScreen;