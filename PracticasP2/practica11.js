import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

export default function App() {
    const [cargando, setCargando] = useState(false);
    const [datos, setDatos] = useState('');

    const SimularCarga = () => {
        setCargando(true);
        setDatos('');

        setTimeout(() => {
            setCargando(false);
            setDatos('Datos cargados correctamente');
        }, 8000);
    }

    return(
        <View style={styles.constainer}>
            <Text style={styles.titulo}>ActivityIndicator :D</Text>
            <Button title='Cargar Datos' onPress={SimularCarga} color='#007AFF'/>

        {cargando && (
            <ActivityIndicator size='large' color='#007AFF' style={styles.loader} />
        )}
        {datos !== '' && <text>{datos}</text>}

        <StatusBar style="auto" />
        </View>
    );


}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loader: {
        marginVertical: 20,
    }
});