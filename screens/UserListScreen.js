import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import UserItem from "../components/UserItem";
import axios from "axios"; // Importa o axios para fazer as requisições HTTP
import { API_URL } from "../constants/api";

// URL base da sua API
//const API_URL = 'http://192.168.2.16:3000';

export default function UserListScreen({ route }) {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Função para carregar usuários da API
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (e) {
      console.error("Falha ao carregar usuários da API", e);
      Alert.alert("Erro", "Não foi possível carregar a lista de usuários.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  // Função para remover um usuário
  const deleteUser = (userId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja remover este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              // Faz uma requisição DELETE para a API
              await axios.delete(`${API_URL}/api/users/${userId}`);

              // Atualiza a lista localmente para refletir a mudança
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
              );
              Alert.alert("Sucesso", "Usuário deletado com sucesso.");
            } catch (e) {
              console.error("Falha ao deletar usuário da API", e);
              Alert.alert("Erro", "Não foi possível deletar o usuário.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <Text style={styles.loadingText}>Carregando usuários...</Text>
        ) : users.length === 0 ? (
          <Text style={styles.emptyListText}>Nenhum usuário cadastrado.</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UserItem user={item} onDelete={() => deleteUser(item.id)} />
            )}
          />
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("UserForm")}
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
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#3498db",
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    lineHeight: 30,
  },
});
