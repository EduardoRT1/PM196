import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

const Texto = (props) => {
  const {contenido}= props;
  return(
    <Text>{contenido}</Text>
  );
}

export default function App() {
  return (

    <View style={styles.container}>
        <StatusBar style="auto" />

      <Texto contenido='Hola'> </Texto>
      <Texto contenido='mundo'> </Texto>
      <Texto contenido='desde'> </Texto>
      <Texto contenido='React Native'> </Texto>
      <Button title='Presiona aquí'/>
      
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
