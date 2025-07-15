import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Home({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Configuración</Text>
            <Pressable style={[styles.button, styles.buttonProfile]} onPress={() => navigation.navigate("profile")}>
                <Text style={styles.buttonText}>Ir a Perfil</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.buttonHome]} onPress={()=> navigation.navigate('home')}>
                <Text style={styles.buttonText}>Ir a Inicio</Text>
            </Pressable>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
        width: "80%",
        alignItems: "center",
    },
    buttonHome: {
        backgroundColor: "#28A745",
    },
    buttonProfile: {
        backgroundColor: "#007BFF",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
})