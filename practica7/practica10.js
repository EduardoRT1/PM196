import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text, ImageBackground, ActivityIndicator} from "react-native";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect ( ()=>{
        setTimeout(()=> setLoading(false), 3000);
    }, []);
    if (loading) {
        return(
            <View style={styles.splash}>
                <Text style={styles.splashText}>Cargando...</Text>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        );
    }
    return(
    <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
        style={styles.background}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text styele={styles.text}>Bienvenido a la app</Text>
        </View>
    </ImageBackground>

    )


}
const styles = StyleSheet.create({
    splash:{
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'

    },
    splashText:{
        color: 'White',
        fontSize: 28,
        marginBottom: 20,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 20,
        borderRadius: 10,
        alignSelf:'center'
    },
    text: {
        color: 'White',
        fontSize: 24,
    },
});
export default App;