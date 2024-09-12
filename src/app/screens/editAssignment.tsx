import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@/components/input';
import { router } from 'expo-router';
import { useAssignmentsDatabase, AssignmentsDatabase } from '../database/useAssignmentsDatabase';

export default function EditTest() {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [data, setData] = useState({
    name: '',
    subject: '',
    date: '',
  });

  const assignmentDatabase = useAssignmentsDatabase();
  const { id: paramId } = useLocalSearchParams<{ id: string }>(); // Carrega o ID dos parâmetros

  // Função para carregar os dados do teste existente
  useEffect(() => {
    async function loadTest() {
      if (paramId) {
        const assignment = await assignmentDatabase.show(Number(paramId)); // Busca o teste pelo ID
        if (assignment) {
          setId(String(assignment.id));
          setName(assignment.name);
          setSubject(assignment.subject);
          setDate(assignment.date);
          setDescription(assignment.description)
        }
      }
    }

    loadTest();
  }, [paramId]);

  async function handleSave() {
    if (id) {
      // Atualiza o teste existente
      await assignmentDatabase.update({
        id: Number(id),
        name,
        subject,
        date,
        description
      });
    }

    setName('');
    setSubject('');
    setDate('');
    setDescription('');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 32, gap: 16}}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input placeholder="Materia" onChangeText={setSubject} value={subject} />
      <Input placeholder="Data" onChangeText={setDate} value={date} />
      <Input placeholder="Description" onChangeText={setDescription} value={description} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
