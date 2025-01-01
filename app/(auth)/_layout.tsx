import { Stack, useRouter } from "expo-router";
import useOnBoardingStore from "../state/OnBoarding";
import { useEffect, useState } from "react";

export default function AuthLayout() {
    const { isOnBoarding } = useOnBoardingStore();
    const [isReady, setIsReady] = useState(false); // Track if the state is loaded
    const router = useRouter();

    useEffect(() => {
        // Delay rendering until the state is loaded
        const initialize = async () => {
            setIsReady(true);
        };
        initialize();
    }, []);

    useEffect(() => {
        if (isReady) {
            // Navigate based on onboarding state
            if (isOnBoarding) {
                router.replace('/LoginScreen'); // Replace to avoid back navigation to the intro
            } else {
                router.replace('/'); // Replace to avoid back navigation to login
            }
        }
    }, [isReady, isOnBoarding]);

    if (!isReady) {
        return null; // You can replace this with a loading spinner if desired
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false, // Hides headers globally for screens in this layout
            }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        </Stack>
    );
}
