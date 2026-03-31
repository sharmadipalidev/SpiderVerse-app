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
    primary: "#dc2626",
    background: "#f8fafc",
    card: "#ffffff",
    text: "#0f172a",
    border: "#cbd5e1",
    notification: "#ef4444",
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
    primary: "#ef4444",
    background: "#0b1220",
    card: "#111827",
    text: "#f8fafc",
    border: "#1f2937",
    notification: "#f97316",
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
      background: "#f8fafc",
      surface: "#ffffff",
      surfaceAlt: "#e2e8f0",
      border: "#cbd5e1",
      text: "#0f172a",
      mutedText: "#334155",
      subtleText: "#64748b",
      primary: "#dc2626",
      primarySoft: "#fee2e2",
      primaryBorder: "#fca5a5",
      secondary: "#2563eb",
      secondarySoft: "#dbeafe",
      secondaryBorder: "#93c5fd",
      accent: "#7c3aed",
      accentSoft: "#ede9fe",
      accentBorder: "#c4b5fd",
      badge: "#1d4ed8",
      badgeText: "#eff6ff",
      input: "#ffffff",
      cardOverlay: "#f1f5f9",
      statusBar: "dark",
      navigationTheme: lightNavigationTheme,
    };
  }

  return {
    mode,
    background: "#0b1220",
    surface: "#111827",
    surfaceAlt: "#1e293b",
    border: "#1f2937",
    text: "#f8fafc",
    mutedText: "#cbd5e1",
    subtleText: "#94a3b8",
    primary: "#ef4444",
    primarySoft: "#991b1b",
    primaryBorder: "#f87171",
    secondary: "#3b82f6",
    secondarySoft: "#1d4ed8",
    secondaryBorder: "#60a5fa",
    accent: "#a855f7",
    accentSoft: "#7c3aed",
    accentBorder: "#a78bfa",
    badge: "#1d4ed8",
    badgeText: "#dbeafe",
    input: "#111827",
    cardOverlay: "#1e293b",
    statusBar: "light",
    navigationTheme: darkNavigationTheme,
  };
};
