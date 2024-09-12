import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

import { useTestDatabase, TestsDatabase } from '../../app/database/useTestDatabase';
import { useAssignmentsDatabase } from "../../app/database/useAssignmentsDatabase"

export default function Details() {
  const [data, setData] = useState({
    name: "",
    subject: "",
    date: "",
  })

  const testsDatabase = useTestDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    if (params.id) {
      testsDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            subject: response.subject,
            date: response.date
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