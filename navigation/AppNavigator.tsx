import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./screen/HomeScreen";
import SpiderListScreen from "./screen/SpiderListScreen";
import SpiderDetailScreen from "./screen/SpiderSongScreen";
import SpiderHQScreen from "./screen/SpiderHQScreen";
import { useAppTheme } from "../theme/AppThemeContext";
import SpiderCharacterScreen from "./screen/SpiderCharacterScreen";
import SpiderApiListScreen from "./screen/SpiderApiListScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabsNavigator = () => {
  const { theme } = useAppTheme();
  const gwenTabColors =
    theme.mode === "dark"
      ? {
          background: "#1f1638",
          border: "#6f4a86",
          active: "#63d9ff",
          inactive: "#f3c7e4",
        }
      : {
          background: "#fff7fc",
          border: "#efc8df",
          active: "#ff5fa2",
          inactive: "#7a6a8d",
        };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { backgroundColor: theme.background },
        tabBarStyle: {
          backgroundColor: gwenTabColors.background,
          borderTopColor: gwenTabColors.border,
          paddingTop: 6,
          paddingBottom: 8,
          height: 66,
          shadowColor: "#20163a",
          shadowOpacity: theme.mode === "dark" ? 0 : 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -4 },
          elevation: 10,
        },
        tabBarActiveTintColor: gwenTabColors.active,
        tabBarInactiveTintColor: gwenTabColors.inactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Friends") {
            return (
              <Ionicons
                name={focused ? "people-circle" : "people-circle-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Songs") {
            return (
              <MaterialCommunityIcons
                name={focused ? "music-circle" : "music-circle-outline"}
                size={size}
                color={color}
              />
            );
          }

          return (
            <MaterialCommunityIcons
              name={focused ? "spider" : "spider-web"}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friends" component={SpiderListScreen} />
      <Tab.Screen name="Songs" component={SpiderDetailScreen} />
      <Tab.Screen name="HQ" component={SpiderHQScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="HeroList" component={SpiderApiListScreen} />
      <Stack.Screen name="CharacterDetail" component={SpiderCharacterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
