import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import Assigments from '../app/screens/home/assignments';

type Props = PressableProps & {
  data: {
    name: string
    subject: string
    date: string
    description: string
  }
  onDelete: () => void
  onOpen: () => void
  onEdit: () => void
}

export function Assigment({ data, onDelete, onOpen, onEdit, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
      }}
      {...rest}
    >
      <Text style={{ flex: 1 }}>
        {data.name} - {data.subject} - {data.date}
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen}>
        <MaterialIcons name="visibility" size={24} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onEdit}>
        <MaterialIcons name="edit" size={24} color="blue" />
      </TouchableOpacity>
    </Pressable>
  )
}