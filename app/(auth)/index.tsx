import React, { useState } from "react";
import { FlatList, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Animated, { Easing, SlideInLeft } from "react-native-reanimated";
import CustomButton from "../components/CustomButton";

const IntroScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

    // Sample array of objects with local image files
    const data = [
        {
            id: "1",
            image: require("../../assets/images/IntroData.png"),
            text: "Life is Short and the world is wide.",
            text1:
                "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world",
        },
        {
            id: "2",
            image: require("../../assets/images/IntroData2.png"),
            text: "It’s a big world out there go explore.",
            text1:
                "To get the best of your adventure you just need to leave and go where you like. we are waiting for you.",
        },
        {
            id: "3",
            image: require("../../assets/images/IntroData3.png"),
            text: "People don’t take trips, trips take people.",
            text1:
                "To get the best of your adventure you just need to leave and go where you like. we are waiting for you.",
        },
    ];

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x; // Current scroll position
        const screenWidth = Dimensions.get("window").width; // Width of the screen
        const index = Math.round(offsetX / screenWidth); // Calculate the current index
        setCurrentIndex(index);
    };

    const renderItem = ({ item }) => {
        return (
            <Animated.View>
                <Animated.Image
                    layout={SlideInLeft.duration(1000).easing(Easing.bounce)}
                    className="rounded-[24px]"
                    source={item.image}
                    style={[styles.container]}
                />
                <View className="mt-[40px]" style={styles.textView}>
                    <Text className="text-[30px] text-center font-['Lato-Bold']">
                        {item.text}
                    </Text>
                </View>
                <View className="mt-[20px]" style={styles.textView}>
                    <Text className="text-[16px] color-[#7D848D] text-center font-['Lato-Bold']">
                        {item.text1}
                    </Text>
                </View>
            </Animated.View>
        );
    };

    return (
        <View className="flex-1">
            <Animated.FlatList
                data={data}
                decelerationRate="fast"
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get("window").width}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onScroll={handleScroll} // Track scroll
                scrollEventThrottle={16} // Optimize performance
            />
            <View
                className="bottom-14"
                style={{
                    width: Dimensions.get("window").width,
                    paddingLeft: 33,
                    paddingRight: 33,
                }}
            >
                <CustomButton
                    title={
                        currentIndex === 0 ? 'Get Started' :
                            currentIndex === 1 ? 'Next'
                                : 'Done'
                    }
                    onPress={() => {

                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
    },
    textView: {
        width: Dimensions.get("window").width,
        paddingLeft: 33,
        paddingRight: 33,
    },
});

export default IntroScreen;
