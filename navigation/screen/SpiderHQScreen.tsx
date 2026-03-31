import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";
import { useAppTheme } from "../../theme/AppThemeContext";

type EarthStatus = {
  id: string;
  earth: string;
  alias: string;
  status: string;
  level: string;
  summary: string;
  accent: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const EARTH_STATUS_DATA: EarthStatus[] = [
  {
    id: "1",
    earth: "Earth-65",
    alias: "Spider-Gwen Home",
    status: "Stable",
    level: "Green",
    summary: "Portal signatures are calm and Gwen's world is reading clean.",
    accent: "#ff5fa2",
    icon: "spider-thread",
  },
  {
    id: "2",
    earth: "Earth-1610",
    alias: "Miles Morales Sector",
    status: "High Activity",
    level: "Amber",
    summary: "Cross-dimensional traffic is elevated after recent collider spikes.",
    accent: "#63d9ff",
    icon: "lightning-bolt",
  },
  {
    id: "3",
    earth: "Earth-928",
    alias: "Nueva York",
    status: "Monitored",
    level: "Blue",
    summary: "Spider-Society systems are online with minor signal congestion.",
    accent: "#7b61ff",
    icon: "city-variant-outline",
  },
  {
    id: "4",
    earth: "Earth-50101",
    alias: "Mumbattan",
    status: "Recovery",
    level: "Amber",
    summary: "Anomaly fallout is stabilizing, but portal stress still needs review.",
    accent: "#ff9f5a",
    icon: "map-marker-radius-outline",
  },
  {
    id: "5",
    earth: "Earth-138",
    alias: "Spider-Punk Route",
    status: "Unpredictable",
    level: "Pink",
    summary: "Chaotic signatures remain noisy, but the route is currently contained.",
    accent: "#ff73b9",
    icon: "guitar-electric",
  },
];

const SpiderHQScreen = () => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={EARTH_STATUS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <View style={styles.heroCard}>
              <View style={styles.topRow}>
                <View style={styles.textWrap}>
                  <Text style={styles.eyebrow}>Mission Control</Text>
                  <Text style={styles.title}>Spider HQ</Text>
                  <Text style={styles.description}>
                    Live Earth statuses, portal health, and multiverse watch data
                    in a cleaner command layout.
                  </Text>
                </View>
                <ThemeToggleButton iconVariant="gwen-theme" />
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>05</Text>
                  <Text style={styles.metricLabel}>Tracked Earths</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>02</Text>
                  <Text style={styles.metricLabel}>Active Alerts</Text>
                </View>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.statusCard, { borderColor: item.accent }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrap, { backgroundColor: item.accent }]}>
                <MaterialCommunityIcons name={item.icon} size={20} color="#fff" />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.earth}>{item.earth}</Text>
                <Text style={styles.alias}>{item.alias}</Text>
              </View>
              <View style={[styles.statusPill, { borderColor: item.accent }]}>
                <Text style={[styles.statusText, { color: item.accent }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.summary}>{item.summary}</Text>

            <View style={styles.footerRow}>
              <Text style={styles.levelLabel}>Threat Level</Text>
              <Text style={[styles.levelValue, { color: item.accent }]}>
                {item.level}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SpiderHQScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.mode === "dark" ? "#110d1f" : "#f7eef8",
    },
    listContent: {
      padding: 18,
      paddingBottom: 28,
      gap: 14,
    },
    headerWrap: {
      marginBottom: 6,
    },
    heroCard: {
      backgroundColor: theme.mode === "dark" ? "#221738" : "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#8968a7" : "#74528e",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    textWrap: {
      flex: 1,
    },
    eyebrow: {
      color: "#ff73b9",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 8,
    },
    title: {
      color: "#ffffff",
      fontSize: 30,
      fontWeight: "900",
      marginBottom: 10,
    },
    description: {
      color: "#efe7ff",
      fontSize: 14,
      lineHeight: 21,
    },
    metricsRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 18,
    },
    metricCard: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.12)",
      borderRadius: 18,
      padding: 14,
    },
    metricValue: {
      color: "#63d9ff",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 4,
    },
    metricLabel: {
      color: "#efe7ff",
      fontSize: 12,
      fontWeight: "700",
    },
    statusCard: {
      borderRadius: 24,
      padding: 18,
      borderWidth: 1,
      backgroundColor: theme.mode === "dark" ? "#1c1528" : "#fff8fd",
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 14,
    },
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    cardHeaderText: {
      flex: 1,
    },
    earth: {
      color: theme.mode === "dark" ? "#faf5ff" : "#20163a",
      fontSize: 18,
      fontWeight: "900",
    },
    alias: {
      color: theme.mode === "dark" ? "#d6caea" : "#6a5c78",
      fontSize: 13,
      marginTop: 2,
    },
    statusPill: {
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.06)" : "#fff",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
    },
    summary: {
      color: theme.mode === "dark" ? "#ded4ef" : "#584b68",
      fontSize: 14,
      lineHeight: 21,
      marginBottom: 14,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    levelLabel: {
      color: theme.mode === "dark" ? "#bcaed2" : "#7a6a8d",
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
    },
    levelValue: {
      fontSize: 14,
      fontWeight: "900",
    },
  });
