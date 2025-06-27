import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, Alert, Switch, Image, ImageBackground, StyleSheet, ActivityIndicator, Platform, SafeAreaView} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptado, setAceptado] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const validarRegistro = () => {
    if (!nombre || !correo) {
      mostrarAlerta('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (!aceptado) {
      mostrarAlerta('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }

    mostrarAlerta(
      'Registro exitoso',
      `Nombre: ${nombre}\nCorreo: ${correo}`
    );
    limpiarFormulario();
  };

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje, [{ text: 'OK' }]);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setAceptado(false);
  };

  if (loading) {
    return (
      <View style={styles.splash}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2721/2721296.png' }}
          style={styles.logo}
        />
        <Text style={styles.splashText}>Cargando...</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>Registro de Usuario</Text>
          <TextInput style={styles.input} placeholder="Nombre completo" value={nombre} onChangeText={setNombre}/>
          <TextInput style={styles.input} placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none"/>
          <View style={styles.switchContainer}>
            <Switch
              value={aceptado}
              onValueChange={setAceptado}
            />
            <Text style={styles.switchLabel}>Aceptar términos y condiciones</Text>
          </View>
          <Button title="Registrarse" onPress={validarRegistro} color="#007AFF" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    color: 'white',
    fontSize: 28,
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formulario: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default App;