import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { getTypeColor, POKEMON_TYPES } from "../constant/types";

interface FilterChipsProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const FilterChips = ({ selectedType, onSelectType }: FilterChipsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          !selectedType && styles.activeChip,
          !selectedType && { backgroundColor: COLORS.text },
        ]}
        onPress={() => onSelectType(null)}
      >
        <Text style={[styles.text, !selectedType && styles.activeText]}>
          All
        </Text>
      </TouchableOpacity>

      {POKEMON_TYPES.map((type) => {
        const isSelected = selectedType === type;
        const color = getTypeColor(type);

        return (
          <TouchableOpacity
            key={type}
            style={[
              styles.chip,
              isSelected && { backgroundColor: color, borderColor: color },
            ]}
            onPress={() => onSelectType(isSelected ? null : (type as string))}
          >
            <Text style={[styles.text, isSelected && styles.activeText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterChips;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "transparent",
    marginRight: 8,
  },
  activeChip: {
    borderColor: "transparent",
  },
  text: {
    color: COLORS.subtext,
    fontSize: 14,
    fontWeight: "600",
  },
  activeText: {
    color: COLORS.background, // Dark text on colored background
    fontWeight: "bold",
  },
});
