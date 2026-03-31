import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { getSpiderTheme, ThemeMode } from "./spiderTheme";

type AppThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  theme: ReturnType<typeof getSpiderTheme>;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemScheme === "light" ? "light" : "dark"
  );

  const value = useMemo(() => {
    const theme = getSpiderTheme(mode);

    return {
      mode,
      isDark: mode === "dark",
      theme,
      toggleTheme: () => {
        setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
      },
    };
  }, [mode]);

  return (
    <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }

  return context;
};
