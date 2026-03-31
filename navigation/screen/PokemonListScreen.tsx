import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PokemonListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.eyebrow}>Spider Squad</Text>
          <Text style={styles.title}>Hero Teams</Text>
          <Text style={styles.description}>
            A simple tab showing Spider-Man alliances, support crews, and team
            energy across the multiverse.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Featured Teams</Text>
          <Text style={styles.cardText}>Spider Society</Text>
          <Text style={styles.cardText}>Web Warriors</Text>
          <Text style={styles.cardText}>Friendly Neighborhood Allies</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PokemonListScreen;

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
    backgroundColor: "#1d4ed8",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  eyebrow: {
    color: "#dbeafe",
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
    color: "#dbeafe",
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
