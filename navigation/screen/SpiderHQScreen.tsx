import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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

  image: string;
  missionTitle: string;
  missionPoints: string[];
  missionTag: string;
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

    image: "https://picsum.photos/seed/earth65gwen/700/320",
    missionTitle: "Op: White Spider",
    missionPoints: [
      "Maintain low-emission spider-signal relay across Manhattan grid.",
      "Coordinate covert check-ins with Captain Stacy every 48 hours.",
      "Monitor NYPD scanner for anomalous dimensional energy mentions.",
    ],
    missionTag: "Recon",
  },
  {
    id: "2",
    earth: "Earth-1610",
    alias: "Miles Morales Sector",
    status: "High Activity",
    level: "Amber",
    summary:
      "Cross-dimensional traffic is elevated after recent collider spikes.",
    accent: "#63d9ff",
    icon: "lightning-bolt",

    image: "https://picsum.photos/seed/earth1610miles/700/320",
    missionTitle: "Op: Live Wire",
    missionPoints: [
      "Deploy beacon drones at three collider epicentre coordinates.",
      "Intercept rogue portal threads before they anchor in civilian zones.",
      "Assess bioelectric field readings around Miles's known patrol route.",
    ],
    missionTag: "High Priority",
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

    image: "https://picsum.photos/seed/earth928nueva/700/320",
    missionTitle: "Op: Nexus Point",
    missionPoints: [
      "Synchronise Spider-Society HQ server logs with the multi-verse map.",
      "Run diagnostics on Lyla AI inference modules — flag any drift.",
      "Patch signal congestion on channels 7-C through 12-F before next sync.",
    ],
    missionTag: "Maintenance",
  },
  {
    id: "4",
    earth: "Earth-50101",
    alias: "Mumbattan",
    status: "Recovery",
    level: "Amber",
    summary:
      "Anomaly fallout is stabilizing, but portal stress still needs review.",
    accent: "#ff9f5a",
    icon: "map-marker-radius-outline",

    image: "https://picsum.photos/seed/earth50101mumbattan/700/320",
    missionTitle: "Op: Rising Tide",
    missionPoints: [
      "Re-anchor three destabilised portal nodes in the harbour district.",
      "Restore Pavitr's local web-comm network to full encryption.",
      "Survey structural integrity of the Vortex Bridge collapse radius.",
    ],
    missionTag: "Recovery",
  },
  {
    id: "5",
    earth: "Earth-138",
    alias: "Spider-Punk Route",
    status: "Unpredictable",
    level: "Pink",
    summary:
      "Chaotic signatures remain noisy, but the route is currently contained.",
    accent: "#ff73b9",
    icon: "guitar-electric",

    image: "https://picsum.photos/seed/earth138punk/700/320",
    missionTitle: "Op: Static Noise",
    missionPoints: [
      "Isolate chaotic energy bursts from Hobart's rogue frequency band.",
      "Deploy signal dampeners along the three active noise corridors.",
      "Cross-reference dimensional static patterns with known anarchic signatures.",
    ],
    missionTag: "Containment",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Recon: { bg: "#22c55e22", text: "#22c55e" },
  "High Priority": { bg: "#ef444422", text: "#ef4444" },
  Maintenance: { bg: "#3b82f622", text: "#3b82f6" },
  Recovery: { bg: "#f97316 22", text: "#f97316" },
  Containment: { bg: "#a855f722", text: "#a855f7" },
};

const SpiderHQScreen = () => {
  const { theme } = useAppTheme();
  const isDark = theme.mode === "dark";
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
                  <Text style={styles.headerSubtitle}>
                    Live status across all tracked dimensions.
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
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>05</Text>
                  <Text style={styles.metricLabel}>Live Missions</Text>
                </View>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const tagColor = TAG_COLORS[item.missionTag] ?? {
            bg: item.accent + "22",
            text: item.accent,
          };

          return (
            <View
              style={[styles.statusCard, { borderColor: item.accent + "66" }]}
            >
              <View style={styles.imageWrap}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View
                  style={[
                    styles.imageOverlay,
                    { backgroundColor: item.accent + "33" },
                  ]}
                />

                <View style={styles.imageEarthBadge}>
                  <Text style={styles.imageEarthText}>{item.earth}</Text>
                </View>

                <View
                  style={[
                    styles.imageStatusPill,
                    { backgroundColor: item.accent + "ee" },
                  ]}
                >
                  <Text style={styles.imageStatusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: item.accent + "22" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={item.accent}
                    />
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.earth}>{item.earth}</Text>
                    <Text style={styles.alias}>{item.alias}</Text>
                  </View>

                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: item.accent + "22" },
                    ]}
                  >
                    <View
                      style={[
                        styles.levelDot,
                        { backgroundColor: item.accent },
                      ]}
                    />
                    <Text style={[styles.levelValue, { color: item.accent }]}>
                      {item.level}
                    </Text>
                  </View>
                </View>

                <Text style={styles.summary}>{item.summary}</Text>

                <View
                  style={[
                    styles.missionBox,
                    {
                      borderColor: item.accent + "44",
                      backgroundColor: isDark
                        ? item.accent + "0d"
                        : item.accent + "09",
                    },
                  ]}
                >
                  <View style={styles.missionHeader}>
                    <MaterialCommunityIcons
                      name="target"
                      size={15}
                      color={item.accent}
                    />
                    <Text style={[styles.missionTitle, { color: item.accent }]}>
                      {item.missionTitle}
                    </Text>

                    <View
                      style={[
                        styles.missionTag,
                        { backgroundColor: tagColor.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.missionTagText,
                          { color: tagColor.text },
                        ]}
                      >
                        {item.missionTag}
                      </Text>
                    </View>
                  </View>

                  {item.missionPoints.map((point, idx) => (
                    <View key={idx} style={styles.missionPoint}>
                      <View
                        style={[
                          styles.bullet,
                          { backgroundColor: item.accent },
                        ]}
                      />
                      <Text style={styles.missionPointText}>{point}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.footerRow}>
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={14}
                    color={isDark ? "#9e8fbe" : "#8a7898"}
                  />
                  <Text style={styles.levelLabel}>Threat Level</Text>
                  <Text style={[styles.footerLevel, { color: item.accent }]}>
                    {item.level}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SpiderHQScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) => {
  const isDark = theme.mode === "dark";

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#0e0a1a" : "#f4edf8",
    },
    listContent: {
      padding: 16,
      paddingBottom: 36,
      gap: 16,
    },
    headerWrap: {
      marginBottom: 6,
    },

    heroCard: {
      backgroundColor: isDark ? "#1a1030" : "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: isDark ? "#6a4e8a" : "#5e3f78",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    textWrap: { flex: 1 },
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
      fontSize: 25,
      fontWeight: "900",
      marginBottom: 8,
    },
    headerSubtitle: {
      color: "#c8b8e8",
      fontSize: 13,
      lineHeight: 19,
    },
    metricsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 18,
    },
    metricCard: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.10)",
      borderRadius: 16,
      padding: 12,
    },
    metricValue: {
      color: "#63d9ff",
      fontSize: 22,
      fontWeight: "900",
      marginBottom: 4,
    },
    metricLabel: {
      color: "#d4c4f0",
      fontSize: 11,
      fontWeight: "700",
    },

    statusCard: {
      borderRadius: 22,
      borderWidth: 1.5,
      overflow: "hidden",
      backgroundColor: isDark ? "#15102a" : "#ffffff",
      shadowColor: "#20163a",
      shadowOpacity: isDark ? 0 : 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 5 },
      elevation: isDark ? 0 : 3,
    },

    imageWrap: {
      width: "100%",
      height: 160,
      position: "relative",
    },
    cardImage: {
      width: "100%",
      height: "100%",
    },

    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
    },

    imageEarthBadge: {
      position: "absolute",
      bottom: 10,
      left: 12,
      backgroundColor: "rgba(0,0,0,0.55)",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    imageEarthText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.5,
    },

    imageStatusPill: {
      position: "absolute",
      top: 10,
      right: 12,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    imageStatusText: {
      color: "#ffffff",
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    cardBody: {
      padding: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    cardHeaderText: { flex: 1 },
    earth: {
      color: isDark ? "#f0eaff" : "#20163a",
      fontSize: 17,
      fontWeight: "900",
    },
    alias: {
      color: isDark ? "#c4b2dc" : "#6a5c78",
      fontSize: 12,
      marginTop: 2,
    },

    levelBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    levelDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    levelValue: {
      fontSize: 12,
      fontWeight: "900",
    },

    summary: {
      color: isDark ? "#d4c4e8" : "#584b68",
      fontSize: 13,
      lineHeight: 20,
      marginBottom: 14,
    },

    missionBox: {
      borderRadius: 14,
      borderWidth: 1,
      padding: 14,
      marginBottom: 14,
      gap: 10,
    },
    missionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    missionTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    missionTag: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    missionTagText: {
      fontSize: 10,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    missionPoint: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    bullet: {
      width: 5,
      height: 5,
      borderRadius: 3,
      marginTop: 7,
      flexShrink: 0,
    },
    missionPointText: {
      flex: 1,
      color: isDark ? "#cfc0e8" : "#4a3d60",
      fontSize: 13,
      lineHeight: 19,
    },

    // Footer row
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    levelLabel: {
      flex: 1,
      color: isDark ? "#9e8fbe" : "#8a7898",
      fontSize: 11,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    footerLevel: {
      fontSize: 13,
      fontWeight: "900",
    },
  });
};
