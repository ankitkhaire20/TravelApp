import React from "react";
import { Text, View } from "react-native";
import { Stack, useRouter } from 'expo-router'; // Use expo-router for navigation

export default function RootLayout() {



    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    )
}