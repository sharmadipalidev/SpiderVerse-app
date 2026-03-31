import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SpiderHQScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Mission Control</Text>
          <Text style={styles.title}>Spider HQ</Text>
          <Text style={styles.description}>
            Track alerts, monitor portals, and keep every Spider-hero ready for
            the next multiverse mission.
          </Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Status</Text>
          <Text style={styles.panelText}>Portal network is stable.</Text>
          <Text style={styles.panelText}>Training simulations are online.</Text>
          <Text style={styles.panelText}>New hero assignments are pending.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpiderHQScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 18,
  },
  heroCard: {
    backgroundColor: "#991b1b",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#f87171",
  },
  eyebrow: {
    color: "#fecaca",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  description: {
    color: "#fee2e2",
    fontSize: 15,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    gap: 10,
  },
  panelTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  panelText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
});
