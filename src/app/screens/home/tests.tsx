import { View, Text , Alert, Button, FlatList} from "react-native"
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { Test } from "@/components/test";


import { TestsDatabase, useTestDatabase, useUserDatabase } from "@/app/database/useUserDatabase";

export default function Tests(){
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [date, setDate] = useState("")
  const [search, setSearch] = useState("")
  const [tests, setTests] = useState<TestsDatabase[]>([])

  const testDatabase = useTestDatabase();

  async function create() {
    try {
      const response = await testDatabase.createTests({name, subject, date})

      Alert.alert("Produto cadastrado com o ID: " + response.inserteRowId)
    } catch (error) {
      console.log(error)
    }
  }

  async function update() {
    try {
      const response = await testDatabase.update({
        id: Number(id),
        name,
        subject,
        date,
      })

      Alert.alert("Produto atualizado!")
    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await testDatabase.searchByName(search)
      setTests(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await testDatabase.remove(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }

  function details(item: TestsDatabase) {
    setId(String(item.id))
    setName(item.name)
    setSubject(item.subject)
    setDate(item.date)
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

      <Button title="Salvar" onPress={handleSave} />

      <Input placeholder="Pesquisar" onChangeText={setSearch} />

      <FlatList
        data={tests}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Test
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() => router.navigate("../" + item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  )

}