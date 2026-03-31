import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";
import { useAppTheme } from "../../theme/AppThemeContext";
import { getSpiderHeroes } from "../../api/spiderApi";
import type { SpiderHero } from "../../types/types";
import SpiderHeroCard from "../../components/spider-hero-card";

const PokemonListScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const [heroes, setHeroes] = React.useState<SpiderHero[]>([]);

  React.useEffect(() => {
    getSpiderHeroes()
      .then((data) => setHeroes(data.slice(0, 6)))
      .catch((error) =>
        console.error("Failed to load teams screen heroes", error),
      );
  }, []);

  const handleCardPress = (hero: SpiderHero) => {
    navigation.navigate("CharacterDetail", { hero });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={styles.topRow}>
            <View style={styles.textWrap}>
              <Text style={styles.eyebrow}>Spider Squad</Text>

              <Text style={styles.description}>Super Hero of multiverse</Text>
            </View>
            <ThemeToggleButton />
          </View>
        </View>

        <FlatList
          data={heroes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SpiderHeroCard hero={item} onPress={handleCardPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default PokemonListScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 20,
      gap: 18,
    },
    banner: {
      backgroundColor: theme.secondarySoft,
      borderRadius: 24,
      padding: 22,
      borderWidth: 1,
      borderColor: theme.secondaryBorder,
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
      color: theme.mode === "dark" ? "#dbeafe" : "#1e3a8a",
      fontSize: 13,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },
    title: {
      color: theme.text,
      fontSize: 30,
      fontWeight: "800",
      marginBottom: 10,
    },
    description: {
      color: theme.mutedText,
      fontSize: 15,
      lineHeight: 22,
    },
    listContent: {
      gap: 14,
      paddingBottom: 20,
    },
  });
