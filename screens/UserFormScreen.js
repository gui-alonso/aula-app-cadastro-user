import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Importa o axios

// URL base da sua API. Mantenha a mesma do UserListScreen.js
const API_URL = 'http://192.168.2.16:3000'; 

export default function UserFormScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Função para validar e enviar o usuário para a API
    const handleSave = async () => {
        let newErrors = {};
        if (name.trim() === "") {
            newErrors.name = "O nome é obrigatório.";
        }
        if (email.trim() === "") {
            newErrors.email = "O email é obrigatório.";
        } else if (!email.includes("@")) {
            newErrors.email = "Formato de email inválido.";
        }
        if (password.trim() === "") {
            newErrors.password = "A senha é obrigatória.";
        } else if (password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newUser = {
            name,
            email,
            password,
        };

        try {
            // Faz uma requisição POST para o seu backend
            const response = await axios.post(`${API_URL}/api/users`, newUser);

            if (response.status === 201) {
                // Sucesso: Limpa o formulário e exibe um alerta
                setName('');
                setEmail('');
                setPassword('');
                setErrors({});
                
                Alert.alert(
                    "Sucesso",
                    "Usuário cadastrado com sucesso!",
                    [{ text: "OK", onPress: () => navigation.navigate('UserList') }]
                );
            }

        } catch (e) {
            // Lida com erros da requisição, como email já cadastrado, etc.
            if (e.response && e.response.data && e.response.data.error) {
                Alert.alert("Erro", e.response.data.error);
            } else {
                Alert.alert("Erro", "Falha ao cadastrar o usuário. Tente novamente.");
            }
            console.error("Falha ao salvar usuário na API", e);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                
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
                
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: { 
        flex: 1, 
        padding: 20,
        justifyContent: 'center', 
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 10,
        fontSize: 12,
        marginLeft: 5,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});