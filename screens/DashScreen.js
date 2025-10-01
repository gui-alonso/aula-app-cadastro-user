import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function DashScreen() {
    const navigation = useNavigation();

    // Função de Sair que leva o usuário de volta para a tela de Login
    const handleLogout = () => {
        navigation.dispatch(StackActions.popToTop());
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Bem-vindo à Dashboard!</Text>
                <Text style={styles.descriptionText}>Você está logado com sucesso.</Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('UserList')}
                >
                    <Text style={styles.buttonText}>Ver Lista de Usuários</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    descriptionText: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
    button: { backgroundColor: '#3498db', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10, marginTop: 20 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logoutButton: { backgroundColor: '#e74c3c', marginTop: 10 }
});