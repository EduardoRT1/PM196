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
