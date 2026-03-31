import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSpiderHeroes } from "../../api/spiderApi";
import SpiderHeroCard from "../../components/spider-hero-card";
import ThemeToggleButton from "../../components/theme-toggle-button";
import type { SpiderHero } from "../../types/types";

const GWEN_COLORS = {
  page: "#fdf7fb",
  panel: "#ffe7f4",
  panelBorder: "#f7b7d8",
  eyebrow: "#ff4fa3",
  title: "#34243f",
  subtitle: "#6a5a74",
  surface: "#fffafe",
  surfaceBorder: "#efc8df",
  input: "#fffafd",
  inputBorder: "#f5bdd8",
  button: "#54d7f4",
  loader: "#54d7f4",
};

const SpiderApiListScreen = () => {
  const navigation = useNavigation<any>();
  const [heroes, setHeroes] = useState<SpiderHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const styles = createStyles();

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

  const handleCardPress = (hero: SpiderHero) => {
    navigation.navigate("CharacterDetail", { hero });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-back" size={22} color={GWEN_COLORS.title} />
          </TouchableOpacity>
          <ThemeToggleButton />
        </View>

        <View style={styles.banner}>
          <Text style={styles.eyebrow}>Spider-Verse API</Text>
          <Text style={styles.title}>All Hero Cards</Text>
          <Text style={styles.subtitle}>
            Browse every hero from the API in one dedicated screen.
          </Text>
        </View>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search heroes, earths, or abilities"
          placeholderTextColor={GWEN_COLORS.subtitle}
          style={styles.searchInput}
        />

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={GWEN_COLORS.loader} />
            <Text style={styles.loaderText}>Loading Spider-Verse heroes...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredHeroes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SpiderHeroCard hero={item} onPress={handleCardPress} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  loadHeroes();
                }}
                tintColor={GWEN_COLORS.loader}
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

export default SpiderApiListScreen;

const createStyles = () =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: GWEN_COLORS.page,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: GWEN_COLORS.surface,
      borderWidth: 1,
      borderColor: GWEN_COLORS.surfaceBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    banner: {
      marginBottom: 14,
      padding: 20,
      borderRadius: 24,
      backgroundColor: GWEN_COLORS.panel,
      borderWidth: 1,
      borderColor: GWEN_COLORS.panelBorder,
    },
    eyebrow: {
      color: GWEN_COLORS.eyebrow,
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 8,
    },
    title: {
      color: GWEN_COLORS.title,
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 8,
    },
    subtitle: {
      color: GWEN_COLORS.subtitle,
      fontSize: 14,
      lineHeight: 21,
    },
    searchInput: {
      backgroundColor: GWEN_COLORS.input,
      borderColor: GWEN_COLORS.inputBorder,
      borderWidth: 1,
      color: GWEN_COLORS.title,
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
    loaderWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    loaderText: {
      color: GWEN_COLORS.subtitle,
      fontSize: 14,
    },
    emptyState: {
      padding: 24,
      borderRadius: 20,
      backgroundColor: GWEN_COLORS.surface,
      borderWidth: 1,
      borderColor: GWEN_COLORS.surfaceBorder,
      alignItems: "center",
    },
    emptyTitle: {
      color: GWEN_COLORS.title,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 6,
    },
    emptyText: {
      color: GWEN_COLORS.subtitle,
      textAlign: "center",
      lineHeight: 20,
    },
  });
