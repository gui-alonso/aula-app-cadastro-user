import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Componente funcional que representa um item de usuário
export default function UserItem({ name, email, password}) {
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.password}>Senha: {password}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    password: {
        fontSize: 14,
        color: '#666',
    }
});