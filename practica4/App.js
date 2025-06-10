import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

const Texto = () => {
  return(
    <Text>Hola mundo!</Text>
  );
}

export default function App() {
  return (

    <View style={styles.container}>
      <Text>Hola mundo!</Text>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <StatusBar style="auto" />
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
