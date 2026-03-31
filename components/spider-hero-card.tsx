import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { SpiderHero } from "../types/types";
import { useAppTheme } from "../theme/AppThemeContext";

type SpiderHeroCardProps = {
  hero: SpiderHero;
  onPress: (hero: SpiderHero) => void;
};

const SpiderHeroCard = ({ hero, onPress }: SpiderHeroCardProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Pressable style={styles.card} onPress={() => onPress(hero)}>
      <Image
        source={{
          uri:
            hero.imageUrl ||
            "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {hero.earth || hero.universe || "Spider-Verse"}
          </Text>
        </View>

        <Text style={styles.name}>{hero.name}</Text>
        <Text style={styles.subtitle}>
          {hero.fullName || hero.identity || "Masked hero"}
        </Text>
        <Text style={styles.meta}>Species: {hero.species || "Unknown"}</Text>
        <Text style={styles.meta} numberOfLines={2}>
          Abilities: {hero.abilities?.join(", ") || "Spider-sense"}
        </Text>
      </View>
    </Pressable>
  );
};

export default SpiderHeroCard;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 22,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.border,
    },
    image: {
      width: "100%",
      height: 220,
      backgroundColor: theme.cardOverlay,
    },
    content: {
      padding: 16,
    },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.badge,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      marginBottom: 10,
    },
    badgeText: {
      color: theme.badgeText,
      fontSize: 12,
      fontWeight: "700",
    },
    name: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 6,
    },
    subtitle: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 10,
    },
    meta: {
      color: theme.mutedText,
      fontSize: 13,
      marginBottom: 4,
    },
  });
