import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constant/colors';


interface StatBarProps {
    label: string;
    value: number;
    max?: number;
    color?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
    label,
    value,
    max = 255,
    color = COLORS.accentEmerald
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <View style={styles.barBackground}>
                <View
                    style={[
                        styles.barFill,
                        {
                            width: `${percentage}%`,
                            backgroundColor: color
                        }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        color: COLORS.subtext,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    value: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
    barBackground: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 3,
    },
});
