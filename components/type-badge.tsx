import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTypeColor } from '../constant/types';


interface TypeBadgeProps {
    type: string;
    size?: 'small' | 'large';
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'small' }) => {
    const backgroundColor = getTypeColor(type);

    return (
        <View style={[styles.container, { backgroundColor }, size === 'large' && styles.containerLarge]}>
            <Text style={[styles.text, size === 'large' && styles.textLarge]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 4,
        alignSelf: 'flex-start',
    },
    containerLarge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    textLarge: {
        fontSize: 14,
    },
});
