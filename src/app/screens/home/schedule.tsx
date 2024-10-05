import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button,
  Alert,
  GestureResponderEvent
} from 'react-native';

// Interface para representar um horário de aula
interface HorarioAula {
  id: string;
  hora: string;
}

// Interface para o estado das aulas
interface AulasState {
  [dia: string]: {
    [hora: string]: string;
  };
}

// Definição dos horários das aulas
const horarioAulas: HorarioAula[] = [
  { id: '1', hora: '08:20 - 10:00' },
  { id: '2', hora: '10:10 - 11:50' },
  { id: '3', hora: '13:30 - 15:10' },
  { id: '4', hora: '15:20 - 17:00' },
  { id: '5', hora: '17:10 - 18:50' },
  { id: '6', hora: '19:00 - 20:40' },
  { id: '7', hora: '21:00 - 22:40' }
];

// Dias da semana de segunda a sexta
const diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const HorariosScreen: React.FC = () => {
  // Estado para armazenar as aulas de cada dia e horário
  const [aulas, setAulas] = useState<AulasState>({
    Segunda: {},
    Terça: {},
    Quarta: {},
    Quinta: {},
    Sexta: {}
  });

  // Estados para gerenciar o modal de adição/edição de aula
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [diaSelecionado, setDiaSelecionado] = useState<string>('');
  const [horaSelecionada, setHoraSelecionada] = useState<string>('');
  const [nomeAula, setNomeAula] = useState<string>('');

  // Função para abrir o modal e definir o dia e hora selecionados
  const abrirModal = (dia: string, hora: string) => {
    setDiaSelecionado(dia);
    setHoraSelecionada(hora);
    // Preenche o campo com o nome da aula existente, se houver
    setNomeAula(aulas[dia]?.[hora] || '');
    setModalVisible(true);
  };

  // Função para salvar a aula no estado
  const salvarAula = () => {
    if (nomeAula.trim() === '') {
      // Evita salvar aulas com nome vazio
      Alert.alert('Erro', 'O nome da aula não pode estar vazio.');
      return;
    }

    // Verificação adicional para garantir que diaSelecionado e horaSelecionada são válidos
    if (!diaSelecionado || !horaSelecionada) {
      Alert.alert('Erro', 'Dia ou horário não selecionado.');
      return;
    }

    setAulas(prevAulas => {
      // Verifica se prevAulas[diaSelecionado] é um objeto
      if (typeof prevAulas[diaSelecionado] !== 'object' || prevAulas[diaSelecionado] === null) {
        console.error(`prevAulas[${diaSelecionado}] não é um objeto:`, prevAulas[diaSelecionado]);
        Alert.alert('Erro', 'Estrutura de dados inconsistente.');
        return prevAulas; // Retorna o estado anterior sem alterações
      }

      return {
        ...prevAulas,
        [diaSelecionado]: {
          ...prevAulas[diaSelecionado],
          [horaSelecionada]: nomeAula.trim()
        }
      };
    });

    setModalVisible(false);
  };

  // Função para remover uma aula
  const removerAula = () => {
    setAulas(prevAulas => {
      if (!prevAulas[diaSelecionado] || typeof prevAulas[diaSelecionado] !== 'object') {
        console.error(`Tentativa de remover aula de um dia inexistente ou inválido: ${diaSelecionado}`);
        Alert.alert('Erro', 'Dia selecionado inválido.');
        return prevAulas;
      }

      const novasAulas: AulasState = { ...prevAulas };
      delete novasAulas[diaSelecionado][horaSelecionada];
      return novasAulas;
    });
    setModalVisible(false);
  };

  // Função renderItem para o FlatList
  const renderDia = ({ item }: { item: string }) => (
    <View style={styles.diaContainer}>
      <Text style={styles.dia}>{item}</Text>
      {horarioAulas.map((horario) => (
        <TouchableOpacity 
          key={horario.id} 
          style={styles.horarioContainer}
          onPress={() => abrirModal(item, horario.hora)}
        >
          <Text style={styles.horario}>
            {horario.hora}
          </Text>
          <Text style={styles.nomeAula}>
            {aulas[item]?.[horario.hora] || '---'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diasDaSemana}
        keyExtractor={(item) => item}
        renderItem={renderDia}
      />

      {/* Modal para adicionar/editar aula */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {aulas[diaSelecionado]?.[horaSelecionada] ? 'Editar Aula' : 'Adicionar Aula'}
            </Text>
            <Text style={styles.modalText}>
              {diaSelecionado} - {horaSelecionada}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Aula"
              value={nomeAula}
              onChangeText={setNomeAula}
            />
            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={salvarAula} />
              {aulas[diaSelecionado]?.[horaSelecionada] && (
                <Button 
                  title="Remover" 
                  color="red" 
                  onPress={removerAula} 
                />
              )}
              <Button 
                title="Cancelar" 
                color="gray" 
                onPress={() => setModalVisible(false)} 
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos para a interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  diaContainer: {
    marginBottom: 20,
  },
  dia: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  horarioContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 8,
  },
  horario: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  nomeAula: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 20, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default HorariosScreen;
