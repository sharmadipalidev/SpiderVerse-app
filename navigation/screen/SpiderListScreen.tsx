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
              <Text style={styles.title}>Friends</Text>
            </View>
            <ThemeToggleButton iconVariant="gwen-theme" />
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
      backgroundColor: theme.mode === "dark" ? "#221738" : "#20163a",
      borderRadius: 24,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#8467a0" : "#74528e",
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
      marginBottom: 5,
    },
    title: {
      color: "#ffffff",
      fontSize: 25,
      fontWeight: "900",
    },

    listContent: {
      gap: 14,
      paddingBottom: 20,
    },
  });
