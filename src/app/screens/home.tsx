import { View, Text, Button, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect} from "react";
import { router, Router } from "expo-router";

import { Input } from "../../components/input";
import { useUserDatabase } from "../database/useUserDatabase"; 

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Bem vindo, Aluno!</Text>
      <View style={styles.datesButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("./home/tests")}
        >
          <Text style={styles.buttonText}>Provas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("./home/assingments")}
        >
          <Text style={styles.buttonText}>Trabalhos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("./home/schedule")}
        >
          <Text style={styles.buttonText}>Horário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datesButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#37474F',
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: 300,
    height: 100,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
});
