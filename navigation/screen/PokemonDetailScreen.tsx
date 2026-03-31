import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PokemonDetailScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.eyebrow}>Multiverse</Text>
          <Text style={styles.title}>Spider Worlds</Text>
          <Text style={styles.description}>
            A simple screen focused on universes, alternate Earths, and portal
            travel inside the Spider-Verse.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Zones</Text>
          <Text style={styles.cardText}>Earth-1610</Text>
          <Text style={styles.cardText}>Earth-65</Text>
          <Text style={styles.cardText}>Nueva York</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PokemonDetailScreen;

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
  banner: {
    backgroundColor: "#7c3aed",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#a78bfa",
  },
  eyebrow: {
    color: "#ede9fe",
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
    color: "#ede9fe",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    gap: 12,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  cardText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
});
