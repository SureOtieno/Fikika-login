import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from "expo-router"; // ✅ the correct way

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');

    const handleSignup = async () => {
        if (!name || !email || !password || !location) {
            Alert.alert("Missing Fields", "All fields are required.");
            return;
        }

        try {
            const response = await fetch('http://192.168.0.105:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, location, password }),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Expected JSON, got: ${text.substring(0, 50)}...`);
            }

            const data = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    if (router && typeof router.replace === 'function') {
                        router.replace('/');
                    } else {
                        console.warn("Router not ready");
                    }
                }, 100);
                if (router && typeof router.replace === 'function') {
                    router.replace('/');
                }

            } else {
                Alert.alert('Signup failed', data.message || 'Could not register');
            }
        } catch (error) {
            console.error("Signup error:", error);
            Alert.alert('Error', 'Failed to connect to the server');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
});
