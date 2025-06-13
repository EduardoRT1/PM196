import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

// Componente Texto que recibe props y muestra el texto dentro de un componente Text
const Texto = (props) => {
  const {children}= props;
  return(
    <Text>{children}</Text>
  );
}

export default function App() {
  return (

    <View style={styles.container}>
        <StatusBar style="auto" />

      <Texto> "hola" </Texto>
      <Texto> "mundo" </Texto>
      <Texto> react </Texto>
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
