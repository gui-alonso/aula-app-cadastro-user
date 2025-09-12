import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import UserItem from '../components/UserItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserListScreen({ route }) {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    // Função para carregar usuários do AsyncStorage
    const loadUsers = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            }
        } catch (e) {
            console.error("Falha ao carregar usuários do AsyncStorage", e);
        }
    };

    // Função para salvar usuários no AsyncStorage
    const saveUsers = async (usersToSave) => {
        try {
            await AsyncStorage.setItem('users', JSON.stringify(usersToSave));
        } catch (e) {
            console.error("Falha ao salvar usuários no AsyncStorage", e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.newUser) {
                const newUser = route.params.newUser;
                setUsers(prevUsers => {
                    const updatedUsers = [...prevUsers, newUser];
                    saveUsers(updatedUsers);
                    return updatedUsers;
                });
                navigation.setParams({ newUser: undefined });
            }
            loadUsers();
        }, [route.params])
    );
    
    useEffect(() => {
        loadUsers();
    }, []);

    // Função para remover um usuário
    const deleteUser = (userId) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja remover este usuário?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Sim", 
                    onPress: () => {
                        const updatedUsers = users.filter(user => user.id !== userId);
                        setUsers(updatedUsers);
                        saveUsers(updatedUsers);
                    }
                }
            ]
        );
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {users.length === 0 ? (
                    <Text style={styles.emptyListText}>Nenhum usuário cadastrado.</Text>
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <UserItem 
                                user={item} 
                                onDelete={() => deleteUser(item.id)}
                            />
                        )}
                    />
                )}
                <TouchableOpacity 
                    style={styles.fab} 
                    onPress={() => navigation.navigate('UserForm')}
                >
                    <Text style={styles.fabText}>+</Text>
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
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#3498db',
        borderRadius: 30,
        elevation: 8,
    },
    fabText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 30,
    }
});