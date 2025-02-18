import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import LottieView from "lottie-react-native";

export default function NoInternet() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(true);

    useEffect(() => {
        // Switch from "Searching for Internet" → "No Internet" after 10 seconds
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 10000);

        // Listen for internet connection to redirect back when online
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                router.replace("/"); // 🚀 Redirect back when online
            }
        });

        return () => {
            clearTimeout(timer);
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            {isSearching ? (
                <LottieView
                    source={require("../assets/lottie/Internet.json")}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            ) : (
                <LottieView
                    source={require("../assets/lottie/Hello.json")}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            )}

            <Text style={styles.text}>
                {isSearching ? "Searching for Internet..." : "No Internet Connection"}
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
                <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    lottie: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "bold",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
