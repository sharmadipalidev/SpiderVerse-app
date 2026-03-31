import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screen/HomeScreen";
import PokemonListScreen from "./screen/PokemonListScreen";
import PokemonDetailScreen from "./screen/PokemonDetailScreen";
import SpiderHQScreen from "./screen/SpiderHQScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { backgroundColor: "#0b1220" },
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopColor: "#1f2937",
          paddingTop: 6,
          paddingBottom: 8,
          height: 66,
        },
        tabBarActiveTintColor: "#ef4444",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarIconStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Teams" component={PokemonListScreen} />
      <Tab.Screen name="Worlds" component={PokemonDetailScreen} />
      <Tab.Screen name="HQ" component={SpiderHQScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
