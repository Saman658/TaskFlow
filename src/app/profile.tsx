import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile & Settings 👤</Text>
            <Text style={styles.subtitle}>TaskFlow User Profile</Text>

            <View style={styles.card}>
                <Text style={styles.cardText}>Name: TaskFlow Student</Text>
                <Text style={styles.cardText}>Status: Active Project</Text>
                <Text style={styles.cardText}>Theme: Dark Mode</Text>
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push('/' as any)}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f12',
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        color: '#8e8e93',
        fontSize: 14,
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#1c1c1e',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        maxWidth: 400,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2c2c2e',
    },
    cardText: {
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0a84ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});