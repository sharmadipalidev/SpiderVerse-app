import React from "react";
import {
    Image,
    Platform,
    StatusBar as RNStatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constant/colors";

interface AppHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  showLogo?: boolean;
}

const AppHeader = ({
  title,
  rightAction,
  showLogo = false,
}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            {showLogo && (
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          {rightAction && <View style={styles.right}>{rightAction}</View>}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  right: {},
});
