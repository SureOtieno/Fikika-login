import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import {router} from "expo-router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false; // 🚪 Mark as unmounted on cleanup
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.0.105:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!isMounted.current) return; // 🛑 Bail if component is gone

            if (response.ok) {
                // ✅ Redirect to home page on successr
                router.replace('/'); // Use 'replace' to prevent going back to login
            } else {
                Alert.alert('Login failed', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert('Error', 'Failed to connect to the server');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});
