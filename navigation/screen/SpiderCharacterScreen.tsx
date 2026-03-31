import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";
import { useAppTheme } from "../../theme/AppThemeContext";
import type { SpiderHero } from "../../types/types";

const SpiderCharacterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { hero } = route.params as { hero: SpiderHero };
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const infoRows = [
    { label: "Full Name", value: hero.fullName },
    { label: "Identity", value: hero.identity },
    { label: "Status", value: hero.status },
    { label: "Species", value: hero.species },
    { label: "Gender", value: hero.gender },
    { label: "Earth", value: hero.earth },
    { label: "Universe", value: hero.universe },
    { label: "Location", value: hero.location || undefined },
    { label: "Nationality", value: hero.nationality || undefined },
    { label: "Age", value: hero.age || undefined },
    { label: "Date of Birth", value: hero.dateOfBirth || undefined },
    { label: "Height", value: hero.height || undefined },
    { label: "Weight", value: hero.weight || undefined },
    { label: "Eye Color", value: hero.eyeColor || undefined },
    { label: "Hair Color", value: hero.hairColor || undefined },
    { label: "Voice Actor", value: hero.voiceActor || undefined },
    { label: "Marital Status", value: hero.maritalStatus || undefined },
  ].filter((item) => item.value);

  const sections = [
    { title: "Aliases", items: hero.aliases },
    { title: "Nicknames", items: hero.nicknames },
    { title: "Affiliations", items: hero.affiliation },
    { title: "Abilities", items: hero.abilities },
    { title: "Occupation", items: hero.occupation },
    { title: "Appearances", items: hero.appearances },
    { title: "Relatives", items: hero.relatives },
    { title: "Romantic Interests", items: hero.romanticInterests },
  ].filter((section) => section.items && section.items.length > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <ThemeToggleButton />
        </View>

        <View style={styles.heroCard}>
          <Image
            source={{
              uri:
                hero.imageUrl ||
                "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
            }}
            style={styles.heroImage}
          />

          <View style={styles.heroBody}>
            <Text style={styles.eyebrow}>{hero.earth || hero.universe || "Spider-Verse"}</Text>
            <Text style={styles.title}>{hero.name}</Text>
            <Text style={styles.subtitle}>
              {hero.fullName || hero.identity || "Spider hero profile"}
            </Text>
            <Text style={styles.description}>
              {hero.description || "No description available for this character yet."}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Character Info</Text>
          {infoRows.map((item) => (
            <View key={item.label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items?.map((item) => (
              <View key={`${section.title}-${item}`} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        {hero.wikiUrl ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wiki Link</Text>
            <Text style={styles.linkText}>{hero.wikiUrl}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpiderCharacterScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
      paddingBottom: 28,
      gap: 16,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    heroCard: {
      backgroundColor: theme.surface,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.border,
    },
    heroImage: {
      width: "100%",
      height: 300,
      backgroundColor: theme.cardOverlay,
    },
    heroBody: {
      padding: 18,
    },
    eyebrow: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },
    title: {
      color: theme.text,
      fontSize: 30,
      fontWeight: "800",
      marginBottom: 8,
    },
    subtitle: {
      color: theme.mutedText,
      fontSize: 15,
      marginBottom: 10,
    },
    description: {
      color: theme.subtleText,
      fontSize: 14,
      lineHeight: 22,
    },
    section: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 10,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 4,
    },
    infoRow: {
      gap: 4,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    infoLabel: {
      color: theme.subtleText,
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
    },
    infoValue: {
      color: theme.text,
      fontSize: 15,
      lineHeight: 22,
    },
    tag: {
      backgroundColor: theme.cardOverlay,
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    tagText: {
      color: theme.text,
      fontSize: 14,
      lineHeight: 20,
    },
    linkText: {
      color: theme.primary,
      fontSize: 14,
      lineHeight: 20,
    },
  });
