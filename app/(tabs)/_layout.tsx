import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5dade2',             // Accent color for active tab icons
                tabBarInactiveTintColor: '#b0b0b5',           // Color for inactive tab icons
                tabBarStyle: { backgroundColor: '#1e1e22' },  // Dark background color for the tab bar
                headerStyle: { backgroundColor: '#2a2a2e' },  // Dark gray-blue for header background
                headerTintColor: '#f0f0f3',                   // Light color for header text and icons
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'HomeScreen',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={20} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="SettingScreen"  // Ensure this matches your actual file name
                options={{
                    title: 'SettingScreen',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={20} name="gear" color={color} />
                }}
            />
        </Tabs>
    )
}
