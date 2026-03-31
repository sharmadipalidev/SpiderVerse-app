import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSpiderHeroes } from "../../api/spiderApi";
import type { SpiderHero } from "../../types/types";

const HomeScreen = () => {
  const [heroes, setHeroes] = useState<SpiderHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const loadHeroes = async () => {
    try {
      const data = await getSpiderHeroes();
      setHeroes(data);
    } catch (error) {
      console.error("Failed to load Spider-Verse heroes", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  const filteredHeroes = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return heroes;
    }

    return heroes.filter((hero) => {
      const searchableValues = [
        hero.name,
        hero.fullName,
        hero.earth,
        hero.universe,
        hero.species,
        hero.identity,
        ...(hero.aliases ?? []),
        ...(hero.abilities ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableValues.includes(query);
    });
  }, [heroes, searchText]);

  const renderCard = ({ item }: { item: SpiderHero }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.imageUrl ||
            "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.cardImage}
      />

      <View style={styles.cardContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.earth || item.universe || "Spider-Verse"}
          </Text>
        </View>

        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>
          {item.fullName || item.identity || "Masked hero of the multiverse"}
        </Text>

        <Text style={styles.cardMeta}>Species: {item.species || "Unknown"}</Text>
        <Text style={styles.cardMeta}>
          Alignment: {item.affiliation?.slice(0, 2).join(", ") || "Independent"}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={3}>
          {item.description || "A Spider-hero ready to protect their universe."}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            Abilities: {item.abilities?.slice(0, 2).join(", ") || "Spider-sense"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroPanel}>
          <Text style={styles.eyebrow}>Spider-Verse Database</Text>
          <Text style={styles.title}>All Spider-Man Heroes</Text>
          <Text style={styles.subtitle}>
            Browse your API data in a card layout with a bold Spider-Man themed
            interface.
          </Text>
        </View>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search heroes, earths, or abilities"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#ef4444" />
            <Text style={styles.loaderText}>Loading Spider-Verse heroes...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredHeroes}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  loadHeroes();
                }}
                tintColor="#ef4444"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No hero found</Text>
                <Text style={styles.emptyText}>
                  Try another search to explore more Spider-Verse characters.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroPanel: {
    marginTop: 8,
    marginBottom: 14,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#991b1b",
    borderWidth: 1,
    borderColor: "#f87171",
  },
  eyebrow: {
    color: "#fecaca",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#fee2e2",
    fontSize: 14,
    lineHeight: 21,
  },
  searchInput: {
    backgroundColor: "#111827",
    borderColor: "#1f2937",
    borderWidth: 1,
    color: "#f8fafc",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
    gap: 14,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  cardImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#1e293b",
  },
  cardContent: {
    padding: 16,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },
  badgeText: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#fca5a5",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardMeta: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 4,
  },
  cardDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  footerRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  footerText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600",
  },
  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loaderText: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  emptyState: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
  },
  emptyTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
});
