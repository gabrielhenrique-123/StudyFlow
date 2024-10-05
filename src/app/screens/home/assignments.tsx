import { View, Text , Alert, Button, FlatList} from "react-native"
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { Test } from "@/components/test";

import { useAssignmentsDatabase, AssignmentsDatabase } from "@/app/database/useAssignmentsDatabase";

export default function Assigments(){
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [search, setSearch] = useState("")
  const [assignments, setAssignments] = useState<AssignmentsDatabase[]>([])

  const assignmentsDatabase = useAssignmentsDatabase();

  async function create() {
    try {
      const response = await assignmentsDatabase.createAssignments({name, subject, date, description})

      Alert.alert(name + " de " + subject + " foi adicionado, com data para " + date)
    } catch (error) {
      console.log(error)
    }
  }

  async function update() {
    try {
      const response = await assignmentsDatabase.update({
        id: Number(id),
        name,
        subject,
        date,
        description
      })

      Alert.alert("Produto atualizado!")
    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await assignmentsDatabase.searchByName(search)
      setAssignments(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await assignmentsDatabase.remove(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }

  function details(item: AssignmentsDatabase) {
    setId(String(item.id))
    setName(item.name)
    setSubject(item.subject)
    setDate(item.date)
  }

  async function edit(id: number) {
    // Navega para a tela de edição, passando o ID do teste
    router.navigate({
      pathname: "../editAssignment",
      params: { id: String(id) },
    });
  }

  async function handleSave() {
    if (id) {
      update()
    } else {
      create()
    }

    setId("")
    setName("")
    setSubject("")
    setDate("")
    setDescription("")
    await list()
  }

  useEffect(() => {
    list()
  }, [search])

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input
        placeholder="Materia"
        onChangeText={setSubject}
        value={subject}
      />

      <Input
        placeholder="Data"
        onChangeText={setDate}
        value={date}
      />

      <Input
        placeholder="Descrição"
        onChangeText={setDescription}
        value={description}
      />

      <Button title="Salvar" onPress={handleSave} />

      <Input placeholder="Pesquisar" onChangeText={setSearch} />

      <FlatList
        data={assignments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Test
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onEdit={() => edit(item.id)}
            onOpen={() => router.navigate("../../" + item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  )

}