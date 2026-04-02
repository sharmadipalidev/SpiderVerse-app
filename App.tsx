import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { AppThemeProvider, useAppTheme } from "./theme/AppThemeContext";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const SPLASH_IMAGE = {
  uri: "https://i.pinimg.com/1200x/05/20/8a/05208a3424d905db3821e938a550c646.jpg",
};

function CustomSplash() {
  return (
    <View style={styles.splash}>
      <StatusBar hidden />
      <Image
        source={SPLASH_IMAGE}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
}

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { theme } = useAppTheme();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return <CustomSplash />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme.navigationTheme}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <AppNavigator />
          <StatusBar style={theme.statusBar} />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  splash: {
    flex: 1,
    backgroundColor: "#fff",
  },
  splashImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
