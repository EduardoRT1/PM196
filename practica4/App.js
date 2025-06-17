import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import React, { useState } from 'react';// Importamos React y useState para manejar el estado

// Componente Texto que recibe props y muestra el texto dentro de un componente Text
const Texto = ({style}) => {
  const [contenido, setContenido] = useState("Hola Mundo"); // Definimos un estado inicial
  const actualizarTexto = () => {setContenido("State modificado")}; // Función para actualizar el estado
  return(
    <Text style={[styles.text,style]} onPress={actualizarTexto}>{contenido}</Text>
  );
}
export default function App() {
  const [contenido, setTitle] = useState("Presioname"); 
  const actualizaBoton = () => {setTitle("State modificado desde un botón")}; // Función para actualizar el estado del botón
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Texto style={styles.amarillo}> </Texto>
      <Texto style={styles.verde}> </Texto>
      <Texto style={styles.rojo}></Texto>
      <Button onPress={actualizaBoton} title={contenido} />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between', //flex-end
    //flexDirection: 'row',
  },
  text:{
    color: 'white',
    fontSize: 27,
    width: 200,
    height: 50,
  },
  rojo: {backgroundColor: 'red',  }, //flex: 1,
  verde: {backgroundColor: 'green',  },
  amarillo: {backgroundColor: 'yellow', },

});
