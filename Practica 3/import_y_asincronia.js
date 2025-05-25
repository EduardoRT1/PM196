//1. Crea una función verificarUsuari0(usuari0) que retorne una promesa
//2. Si el nombre de usuario es "admin", la promesa se resuelve con "Acceso concedido", si no,se rechaza con "Acceso denegado"

function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
    });
}
    //usa then y catch para manejar el resultado
    verificarUsuario("admin")
        .then(res=> console.log(res)) // acceso concedido
        .catch(err=> console.error(err));

    verificarUsuario("lalo")
        .then(res=> console.log(res))
        .catch(err=> console.error(err)); // acceso denegado


//Crea una función obtenerDatos() que simule una llamada a una API con setTimeout y usar async/await para esperar el resultado.
function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos coorectamente");
        }, 5000); // Simula una espera de 5 segundos
    });
}
async function obtenerDatos() { 
    //usa await para esperar la promesa de simularPeticionAPI
    //imprime el resultado
    try {
        const datos = await simularPeticionAPI();
        console.log(datos);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
// usa la funcion async
obtenerDatos();