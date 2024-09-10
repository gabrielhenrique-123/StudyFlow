import { View, Text, Button, Alert } from "react-native";
import { useState, useEffect} from "react";
import { router, Router } from "expo-router";

import { Input } from "../components/input";
import { useUserDatabase } from "./database/useUserDatabase"; 

export default function Index(){
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const userDatabase = useUserDatabase();

  async function create(){
    try{
      const response = await userDatabase.create({name, cpf, user, password});

      Alert.alert("Usuário Cadastrado com o ID: " + response.inserteRowId)
    } catch(error){
      console.log(error)
    }
  }

  async function verify() {
    try {
      const response = await userDatabase.searchVerify(user, password);
      
      if (response && response.user === user && response.password === password) {
        Alert.alert("Login encontrado");
      } else {
        Alert.alert("Login não encontrado");
      }
    } catch (error) {
      console.log("Erro ao verificar login:", error);
    }
  }
  

  async function update(){
    try{
      const response = await userDatabase.create({name, cpf, user, password});

      Alert.alert("Usuário Cadastrado com o ID: " + response.inserteRowId)
    } catch(error){
      console.log(error)
    }
  }

  return (
    <View style = {{flex: 1, justifyContent: "center", gap: 16, padding: 32}}>
      <Input placeholder="Usuário" onChangeText={setUser} value = {user}/>
      <Input placeholder="Senha" onChangeText={setPassword} value = {password}/>
      <Button title="Login" onPress={() => {router.navigate("./screens/home")}}/>
      <Button title = "Cadastro" onPress={() => {router.navigate("./screens/singUp")}}/>
    </View>
  )
}