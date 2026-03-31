import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { Image } from "react-native";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const SPLASH_IMAGE = {
  uri: "https://i.pinimg.com/736x/62/0c/5b/620c5b2cd89fe0564a4ec158e45ef7e8.jpg",
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

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <CustomSplash />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <AppNavigator />
          <StatusBar style="light" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
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
