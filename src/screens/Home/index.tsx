import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { useState } from "react";

import { Participant } from "../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [newParticipant, setNewParticipant] = useState("")
  const [participants, setParticipants] = useState(["Pedro Henrique Fernandes", "Filipe Mateus Fernandes", "José", "Denise", "Débora", "Lisânia", "Allan", "Rafael", "Íris"])

  function handleParticipantAdd() {
    if(participants.includes(newParticipant)){
      return Alert.alert("Participante já existente", "Este participante já está cadastrado!");
    }
    if(newParticipant.trim() === ""){
      return Alert.alert("Nome inválido", "O nome do participante não pode ser vazio!");
    }

    Alert.alert("Adicionar participante", `Deseja adicionar ${newParticipant}?`, [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => {
          setParticipants(oldParticipants => [...oldParticipants, newParticipant])
          setNewParticipant("")
        }
      }])
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover participante", `Deseja remover ${name}?`, [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => {
          const newParticipants = participants.filter(participant => participant !== name)
          setParticipants(newParticipants)
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={newParticipant}
          onChangeText={setNewParticipant}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            Nenhum participante adicionado.
          </Text>
        )}
      />
    </View>
  )
}