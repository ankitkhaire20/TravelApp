import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

interface OnBoardingState {
    isOnBoarding: boolean;
    setOnBoarding: (value: boolean) => void;
}


const useOnBoardingStore = create<OnBoardingState>()(
    persist(
        (set) => ({
            isOnBoarding: false,
            setOnBoarding: (value: boolean) => set(() => ({
                isOnBoarding: value
            })),
        }), {
        name: 'OnBoarding-storage',
        storage: {
            getItem: async (name) => {
                const value = await AsyncStorage.getItem(name);
                return value ? JSON.parse(value) : null; // Parse JSON string
            },
            setItem: async (name, value) => {
                await AsyncStorage.setItem(name, JSON.stringify(value)); // Convert to JSON string
            },
            removeItem: async (name) => {
                await AsyncStorage.removeItem(name); // Remove item
            },
        },
    }
    )
)

export default useOnBoardingStore;