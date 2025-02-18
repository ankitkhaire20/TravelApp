import React, { useEffect, useState } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import useAuthStore from "./state/auth";

export default function RootLayout() {
    const router = useRouter();
    const pathname = usePathname();
    const [isConnected, setIsConnected] = useState(true);
    const { isLogin } = useAuthStore();

    useEffect(() => {
        // Monitor network connectivity
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected && pathname !== "/NoInternetScreen") {
                router.push("/NoInternetScreen"); // 🚀 Redirect if offline
            } else if (state.isConnected && pathname === "/NoInternetScreen") {
                router.replace(isLogin ? "/(tabs)" : "/(auth)"); // 🔄 Restore previous screen on reconnection
            }
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, [pathname, isLogin]);

    useEffect(() => {
        // Ensure correct navigation based on login status
        if (!isLogin && pathname !== "/(auth)") {
            router.replace("/(auth)"); // Redirect to login if not logged in
        } else if (isLogin && pathname !== "/(tabs)") {
            router.replace("/(tabs)"); // Redirect to main app if logged in
        }
    }, [isLogin]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
