import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../constants/api";

// URL base da sua API
//const API_URL = 'http://192.168.2.16:3000'; // MUDAR PARA O SEU IP

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        let newErrors = {};
        if (email.trim() === "") {
            newErrors.email = "O email é obrigatório.";
        } else if (!email.includes("@")) {
            newErrors.email = "Formato de email inválido.";
        }
        if (password.trim() === "") {
            newErrors.password = "A senha é obrigatória.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/login`, { email, password });

            if (response.status === 200) {
                const { name, role } = response.data;
                Alert.alert("Bem-vindo!", `Olá, ${name}! Seu cargo é: ${role}`);
                
                // === LÓGICA DE NAVEGAÇÃO CONDICIONAL ===
                if (role === 'admin') {
                    navigation.navigate('UserList');
                } else {
                    navigation.navigate('DashScreen');
                }
            }

        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) {
                Alert.alert("Erro de Login", e.response.data.error);
            } else {
                Alert.alert("Erro", "Falha ao fazer login. Verifique sua conexão.");
            }
            console.error("Erro no login:", e);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Fazer Login</Text>
                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                
                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('UserForm')}>
                    <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 15, marginBottom: 10, backgroundColor: '#fff', fontSize: 16 },
    inputError: { borderColor: '#e74c3c' },
    errorText: { color: '#e74c3c', marginBottom: 10, fontSize: 12, marginLeft: 5 },
    button: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    registerText: { marginTop: 20, textAlign: 'center', color: '#3498db' }
});