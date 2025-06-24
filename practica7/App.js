import {View, Text, Button, StyleSheet, Alert, Platform} from 'react-native';


export default function App() { 

  
  const showAlert = (message) => {
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Alert', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Buttons Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.description}>Boton básico</Text>
        <Button
          title="Presioname"
          onPress={() => showAlert('Boton presionado!')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton de color:</Text>
        <Button
          title="Boton de color"
          color="#f194ff"
          onPress={() => showAlert('Boton de color presionado!')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton deshabilitado:</Text>
        <Button
          title="Deshabilitado"
          disabled
          onPress={() => showAlert('No funciona :(')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Two Buttons:</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Izquierda"
            onPress={() => showAlert('boton Izquierdo presionado')}
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="derecha"
            onPress={() => showAlert('boton Derecho presionado')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000000',
  },
  section: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 10,
  },
});