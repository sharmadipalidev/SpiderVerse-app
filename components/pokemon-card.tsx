import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constant/colors";

type PokemonDetail = {
  name: string;
};

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: (detail: PokemonDetail) => void;
}

const PokemonCard = ({ name, url, onPress }: PokemonCardProps) => {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const idStr = url.split("/").filter(Boolean).pop();
  const id = idStr ? parseInt(idStr) : 0;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  useEffect(() => {
    setDetail({ name });
    setLoading(false);
  }, [name]);

  const handlePress = () => {
    if (detail) {
      onPress(detail);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={loading}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.id}>#{String(id).padStart(3, "0")}</Text>
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        <View style={styles.types}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.subtext} />
          ) : (
            <Text style={styles.typeText}>Spider Variant Ready</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    flexDirection: "row",
    height: 120,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 120,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  id: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  typeText: {
    color: COLORS.subtext,
    fontSize: 13,
    fontWeight: "600",
  },
});
