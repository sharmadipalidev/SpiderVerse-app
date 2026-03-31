import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme/AppThemeContext";

type ThemeToggleButtonProps = {
  iconVariant?: "theme" | "spider" | "gwen-theme";
};

const ThemeToggleButton = ({
  iconVariant = "theme",
}: ThemeToggleButtonProps) => {
  const { isDark, toggleTheme, theme } = useAppTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      {iconVariant === "spider" ? (
        <MaterialCommunityIcons
          name={isDark ? "spider-thread" : "spider"}
          size={20}
          color={theme.text}
        />
      ) : iconVariant === "gwen-theme" ? (
        <Feather
          name={isDark ? "sun" : "moon"}
          size={18}
          color={isDark ? "#ffd166" : "#ff6eb8"}
        />
      ) : (
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={20}
          color={isDark ? "#f59e0b" : theme.accent}
        />
      )}
    </Pressable>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
