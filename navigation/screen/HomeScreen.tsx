import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";
import { useAppTheme } from "../../theme/AppThemeContext";

const GWEN_BACKGROUND_IMAGE = require("../../assets/gwen-background.jpg");

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ImageBackground
          source={GWEN_BACKGROUND_IMAGE}
          style={styles.heroPanel}
          imageStyle={styles.heroBackgroundImage}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <View style={styles.topPanel}>
              <View style={styles.heroTopRow}>
                <View style={styles.heroTextWrap}>
                  <Text style={styles.eyebrow}>Welcome to Spider-Verse</Text>
                  <Text style={styles.title}>Ghost-Spider</Text>
                  <Text style={styles.subHeading}>
                    "Hey, I'm Gwen Stacy of Earth-65"
                  </Text>
                </View>
                <ThemeToggleButton iconVariant="gwen-theme" />
              </View>
            </View>
            <View style={styles.heroSpacer} />
            <View style={styles.bottomPanel}>
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation.navigate("HeroList")}
              >
                <Text style={styles.ctaButtonText}>
                  Meet All Spider-Verse Heroes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    heroPanel: {
      flex: 1,
    },
    heroBackgroundImage: {
      width: "100%",
      height: "100%",
    },
    heroOverlay: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 6,
      paddingBottom: 18,
      justifyContent: "space-between",
    },
    topPanel: {
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(32,22,58,0.62)"
          : "rgba(255,248,253,0.68)",
      borderRadius: 28,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#8467a0" : "#f7b7d8",
      gap: 16,
    },
    heroTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },
    heroTextWrap: {
      flex: 1,
    },
    eyebrow: {
      color: "#ff73b9",
      fontSize: 12,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 4,
    },
    title: {
      color: theme.mode === "dark" ? "#63d9ff" : "#ffffff",
      fontSize: 30,
      fontWeight: "900",
      // marginBottom: 8,
      fontFamily: "RockeBrush",
    },
    subHeading: {
      color: theme.mode === "dark" ? "#efe7ff" : "#20163a",
      fontSize: 14,
      lineHeight: 21,
    },
    infoRow: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
    },
    infoChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#63d9ff",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
    },
    infoChipText: {
      color: "#20163a",
      fontSize: 13,
      fontWeight: "800",
    },
    heroSpacer: {
      flex: 1,
    },
    bottomPanel: {
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(20,15,34,0.72)"
          : "rgba(255,248,253,0.84)",
      borderRadius: 28,
      padding: 1,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#4c3a5d" : "#efc8df",
    },
    bottomEyebrow: {
      color: "#ff73b9",
      fontSize: 12,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 4,
    },
    bottomText: {
      color: theme.mode === "dark" ? "#efe7ff" : "#584b68",
      fontSize: 14,
      // lineHeight: 12,
      marginBottom: 1,
    },
    ctaButton: {
      backgroundColor: "#63d9ff",
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: "center",
    },
    ctaButtonText: {
      color: "#20163a",
      fontSize: 15,
      fontWeight: "900",
    },
  });
