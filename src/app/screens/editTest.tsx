import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@/components/input';
import { router } from 'expo-router';
import { useTestDatabase, TestsDatabase } from '../../app/database/useTestDatabase';

export default function EditTest() {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [data, setData] = useState({
    name: '',
    subject: '',
    date: '',
  });

  const testsDatabase = useTestDatabase();
  const { id: paramId } = useLocalSearchParams<{ id: string }>(); // Carrega o ID dos parâmetros

  // Função para carregar os dados do teste existente
  useEffect(() => {
    async function loadTest() {
      if (paramId) {
        const test = await testsDatabase.show(Number(paramId)); // Busca o teste pelo ID
        if (test) {
          setId(String(test.id));
          setName(test.name);
          setSubject(test.subject);
          setDate(test.date);
        }
      }
    }

    loadTest();
  }, [paramId]);

  async function handleSave() {
    if (id) {
      // Atualiza o teste existente
      await testsDatabase.update({
        id: Number(id),
        name,
        subject,
        date,
      });
    }

    setName('');
    setSubject('');
    setDate('');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 32, gap: 16}}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input placeholder="Materia" onChangeText={setSubject} value={subject} />
      <Input placeholder="Data" onChangeText={setDate} value={date} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
