import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";

const GWEN_BACKGROUND_IMAGE = require("../../assets/gwen-background.jpg");
const GWEN_COLORS = {
  page: "#f6ebfb",
  panelBorder: "#9b3672",
  overlayBottom: "rgba(38, 12, 56, 0.72)",
  eyebrow: "#d65397",
  title: "#ffffff",
  subtitle: "#efe7ff",
  button: "#63d9ff",
  buttonText: "#20163a",
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const styles = createStyles();

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
            <View style={styles.heroTopRow}>
              <View style={styles.heroTextWrap}>
                <Text style={styles.eyebrow}>Welcome to Spider-Verse</Text>
                <Text style={styles.title}>Ghost-Spider</Text>
                <Text style={styles.subtitle}>
                  "Hey, I'm Gwen Stacy from Earth-65"
                </Text>
              </View>
              <ThemeToggleButton iconVariant="gwen-theme" />
            </View>
            <View style={styles.heroSpacer} />
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate("HeroList")}
              activeOpacity={0.85}
            >
              <Text style={styles.ctaButtonText}>
                Meet All Spider-Verse Heroes
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = () =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: GWEN_COLORS.page,
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
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: "space-between",
      backgroundColor: GWEN_COLORS.overlayBottom,
    },
    heroTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingVertical: 14,

      borderRadius: 12,

      // gap: 12,
    },
    heroTextWrap: {
      flex: 1,
    },
    eyebrow: {
      color: GWEN_COLORS.eyebrow,
      fontSize: 14,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 5,
    },
    title: {
      color: GWEN_COLORS.button,
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 3,
    },
    subtitle: {
      color: GWEN_COLORS.subtitle,
      fontSize: 14,
      lineHeight: 21,
    },
    heroSpacer: {
      flex: 1,
    },
    ctaButton: {
      backgroundColor: GWEN_COLORS.button,
      borderRadius: 25,
      opacity: 0.9,
      color: GWEN_COLORS.title,
      paddingVertical: 8,
      paddingHorizontal: 13,
      alignItems: "center",
    },
    ctaButtonText: {
      color: GWEN_COLORS.buttonText,
      fontSize: 15,
      fontWeight: "800",
    },
  });
