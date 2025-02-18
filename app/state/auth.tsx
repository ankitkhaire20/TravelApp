import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStateProps {
    authDetails: string | null;
    setAuthDetails: (value: string) => void;
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

const useAuthStore = create<AuthStateProps>()(
    persist(
        (set) => ({
            authDetails: null,
            setAuthDetails: (value) => set({ authDetails: value }),
            isLogin: false,
            setIsLogin: (value) => set({ isLogin: value })
        }),
        {
            name: "authDetails",
            storage: {
                getItem: async (key) => {
                    const value = await AsyncStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (key, value) => {
                    await AsyncStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: async (key) => {
                    await AsyncStorage.removeItem(key);
                },
            },
        }
    )
);

export default useAuthStore;
