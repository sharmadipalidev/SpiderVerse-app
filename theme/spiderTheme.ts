import type { Theme } from "@react-navigation/native";

export type ThemeMode = "light" | "dark";

export type SpiderTheme = {
  mode: ThemeMode;
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  mutedText: string;
  subtleText: string;
  primary: string;
  primarySoft: string;
  primaryBorder: string;
  secondary: string;
  secondarySoft: string;
  secondaryBorder: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  badge: string;
  badgeText: string;
  input: string;
  cardOverlay: string;
  statusBar: "light" | "dark";
  navigationTheme: Theme;
};

const lightNavigationTheme: Theme = {
  dark: false,
  colors: {
    primary: "#ff5fa2",
    background: "#f8eef8",
    card: "#fff8fd",
    text: "#20163a",
    border: "#efc8df",
    notification: "#63d9ff",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "800",
    },
  },
};

const darkNavigationTheme: Theme = {
  dark: true,
  colors: {
    primary: "#ff73b9",
    background: "#140f22",
    card: "#1e1729",
    text: "#f7f1ff",
    border: "#4c3a5d",
    notification: "#63d9ff",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "800",
    },
  },
};

export const getSpiderTheme = (mode: ThemeMode): SpiderTheme => {
  if (mode === "light") {
    return {
      mode,
      background: "#f8eef8",
      surface: "#fff8fd",
      surfaceAlt: "#ffe7f4",
      border: "#efc8df",
      text: "#20163a",
      mutedText: "#584b68",
      subtleText: "#7a6a8d",
      primary: "#ff5fa2",
      primarySoft: "#ffdceb",
      primaryBorder: "#f7b7d8",
      secondary: "#63d9ff",
      secondarySoft: "#def7ff",
      secondaryBorder: "#9eeaff",
      accent: "#7b61ff",
      accentSoft: "#ece6ff",
      accentBorder: "#c4b5fd",
      badge: "#20163a",
      badgeText: "#fdf7fb",
      input: "#fffafd",
      cardOverlay: "#f5e7f3",
      statusBar: "dark",
      navigationTheme: lightNavigationTheme,
    };
  }

  return {
    mode,
    background: "#140f22",
    surface: "#1e1729",
    surfaceAlt: "#221738",
    border: "#4c3a5d",
    text: "#f7f1ff",
    mutedText: "#d4c8e8",
    subtleText: "#bcaed2",
    primary: "#ff73b9",
    primarySoft: "#342744",
    primaryBorder: "#8467a0",
    secondary: "#63d9ff",
    secondarySoft: "#1a3042",
    secondaryBorder: "#3d6b84",
    accent: "#9b7bff",
    accentSoft: "#342b4e",
    accentBorder: "#6f5da8",
    badge: "#63d9ff",
    badgeText: "#20163a",
    input: "#1c1528",
    cardOverlay: "#2a2136",
    statusBar: "light",
    navigationTheme: darkNavigationTheme,
  };
};
