import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    SafeAreaView,
    Platform,
} from 'react-native';

const App = () => {
    const[nombre, setNombre] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[telefono, setTelefono] = useState('');

    const mostrarAlerta = () => {
        if(!nombre || !email || !password) {
            if (Platform.OS === 'web') {
                window.alert('Por favor, completa todos los campos.');
            } else {
                Alert.alert()
                    'Error',
                    'Por favor, completa todos los campos.',
                    [{ text: 'OK' }]
            }
        } else { 
            if (Platform.OS === 'web') {
                window.alert(`Registro exitoso:\n Nombre : ${nombre}\n Email: ${email}\n Teléfono: ${telefono}`);
                limpiarFormulario();
            } else {
                Alert.alert(
                    'Registro exitoso',
                    `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}`,
                    [{ text: 'OK', onPress:() => limpiarFormulario() }]
                );
            }
        }
    }
    const limpiarFormulario = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setTelefono('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formulario}>
               <Text style={styles.titulo}>Registro de Usuario</Text> 
               <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email *"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña *"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                    keyboardType="phone-pad"
                />
                <Button
                    title="Registrar"
                    onPress={mostrarAlerta}
                    color="#841584"
                />
               </View>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formulario: {
        backgroundColor: '#f8f8f8',
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
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    }, 
} );
export default App;
    