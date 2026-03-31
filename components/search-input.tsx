import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { COLORS } from '../constant/colors';


interface SearchInputProps extends TextInputProps {
    onClear?: () => void;
}


const SearchInput = ({onClear , style , ...props}:SearchInputProps) => {
  return (
    <View style={styles.container}>
            <Text style={styles.icon}>Search</Text>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={COLORS.subtext}
                {...props}
            />
            {props.value ? (
                <Pressable onPress={onClear} style={styles.clearButton}>
                    <Text style={styles.clearText}>Clear</Text>
                </Pressable>
            ) : null}
        </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        height: 48,
    },
    icon: {
        marginRight: 8,
        color: COLORS.subtext,
        fontSize: 13,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        height: '100%',
    },
    clearButton: {
        marginLeft: 8,
    },
    clearText: {
        color: COLORS.subtext,
        fontSize: 13,
        fontWeight: '600',
    },
});
