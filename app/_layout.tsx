import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';



import { useColorScheme } from '@/hooks/useColorScheme';
import AppProvider from './AppProvider';
import { Font } from '@/src/utills/globals';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    [Font.LATO_BOLD]: require('../assets/fonts/Lato-Bold.ttf'),
    [Font.LATO_REGULAR]: require('../assets/fonts/Lato-Regular.ttf'),
    [Font.POPPINS_BOLD]: require('../assets/fonts/Poppins-Bold.ttf'),
    [Font.POPPINS_REGULAR]: require('../assets/fonts/Poppins-Regular.ttf'),
    [Font.SPACEMONO_REGULAR]: require('../assets/fonts/SpaceMono-Regular.ttf'),
    IcoMoon: require('../assets/Icomoon/icomoon.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider />
  );
}
