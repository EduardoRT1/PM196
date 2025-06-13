import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import React, { useState } from 'react';// Importamos React y useState para manejar el estado

// Componente Texto que recibe props y muestra el texto dentro de un componente Text
const Texto = () => {
  const [contenido, setContenido] = useState("Hola Mundo"); // Definimos un estado inicial
  const actualizarTexto = () => {setContenido("State modificado")}; // Función para actualizar el estado
  return(
    <Text onPress={actualizarTexto}>{contenido}</Text>
  );
}
export default function App() {
  const [contenido, setTitle] = useState("Presioname"); 
  const actualizaBoton = () => {setTitle("State modificado desde un botón")}; // Función para actualizar el estado del botón
  return (
    <View style={styles.container}>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <Button onPress={actualizaBoton} title={contenido} />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
