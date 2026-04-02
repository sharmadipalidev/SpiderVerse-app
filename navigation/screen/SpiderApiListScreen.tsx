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
import { useAppTheme } from "../../theme/AppThemeContext";
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
  const { theme } = useAppTheme();
  const navigation = useNavigation<any>();
  const [heroes, setHeroes] = useState<SpiderHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const styles = createStyles(theme);

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
            <Ionicons
              name="arrow-back"
              size={22}
              color={styles.backIcon.color}
            />
          </TouchableOpacity>
          <ThemeToggleButton iconVariant="gwen-theme" />
        </View>

        <View style={styles.banner}>
          <Text style={styles.eyebrow}>Spider-Verse</Text>
          <Text style={styles.title}>MultiVerse of Spiders</Text>
        </View>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search heroes, earths, or abilities"
          placeholderTextColor={styles.searchPlaceholder.color}
          style={styles.searchInput}
        />

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={styles.loader.color} />
            <Text style={styles.loaderText}>
              Loading Spider-Verse heroes...
            </Text>
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
                tintColor={styles.loader.color}
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

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) => {
  const palette =
    theme.mode === "dark"
      ? {
          page: "#140f22",
          panel: "#221738",
          panelBorder: "#8467a0",
          eyebrow: "#ff73b9",
          title: "#f7f1ff",
          subtitle: "#d4c8e8",
          surface: "#1e1729",
          surfaceBorder: "#4c3a5d",
          input: "#1c1528",
          inputBorder: "#4f3e63",
          button: "#63d9ff",
          loader: "#63d9ff",
        }
      : GWEN_COLORS;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.page,
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
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.surfaceBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    backIcon: {
      color: palette.title,
    },
    banner: {
      marginBottom: 14,
      padding: 20,
      borderRadius: 24,
      backgroundColor: palette.panel,
      borderWidth: 1,
      borderColor: palette.panelBorder,
    },
    eyebrow: {
      color: palette.eyebrow,
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 1,
    },
    title: {
      color: palette.title,
      fontSize: 25,
      fontWeight: "800",
    },
    subtitle: {
      color: palette.subtitle,
      fontSize: 14,
      lineHeight: 21,
    },
    searchPlaceholder: {
      color: palette.subtitle,
    },
    searchInput: {
      backgroundColor: palette.input,
      borderColor: palette.inputBorder,
      borderWidth: 1,
      color: palette.title,
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
    loader: {
      color: palette.loader,
    },
    loaderText: {
      color: palette.subtitle,
      fontSize: 14,
    },
    emptyState: {
      padding: 24,
      borderRadius: 20,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.surfaceBorder,
      alignItems: "center",
    },
    emptyTitle: {
      color: palette.title,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 6,
    },
    emptyText: {
      color: palette.subtitle,
      textAlign: "center",
      lineHeight: 20,
    },
  });
};
