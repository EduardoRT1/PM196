import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Home({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Perfil</Text>
            <Pressable style={[styles.button, styles.buttonSettings]} onPress={() => navigation.navigate("settings")}>
                <Text style={styles.buttonText}>Ir a Configuración</Text>
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
    buttonSettings: {
        backgroundColor: "#FF8800",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
})