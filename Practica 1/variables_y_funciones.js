// Variables y funciones en JavaScript
let nombre = "Armando" ;
const edad = 25;

nombre = "Ana Mariana";
let saludo = "Hola, " + nombre + ", tienes " + edad + " años";
console.log(saludo);

//funcion arrow para el cuadrado de un numero
const cuadrado = (num) => {
    return num * num;
}
console.log(cuadrado(10));

/* Crea una arrow function llamada saludoPersonalizado que reciba dos
parámetros: nombre y edad, y retorne una cadena como la siguiente */
const saludoPersonalizado = (nombre, edad) => {
    return `Hola, me llamo ${nombre} y tengo ${edad} años.`;
}
console.log(saludoPersonalizado("Eduardo", 21));
