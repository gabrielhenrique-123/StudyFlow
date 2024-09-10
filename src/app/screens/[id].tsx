import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

import { useTestDatabase, useUserDatabase } from "../database/useUserDatabase"

export default function Details() {
  const [data, setData] = useState({
    name: "",
    subject: "",
    date: "",
  })

  const productDatabase = useTestDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    if (params.id) {
      productDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            subject: response.subject,
            date: response.date,
          })
        }
      })
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id} </Text>

      <Text style={{ fontSize: 32 }}>Data: {data.date}</Text>

      <Text style={{ fontSize: 32 }}>Materia: {data.subject}</Text>

      <Text style={{ fontSize: 32 }}>Nome: {data.name}</Text>
    </View>
  )
}