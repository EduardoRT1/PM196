//2. Extrae los valores de nombre, edad y ciudad usando destructuración.
//3.Luego, muestra un mensaje como: "Me llamo Ivan Isay, tengo 37 años y vivo en Qro. "

const persona = {
    nombre: "Eduardo Rojas Trejo",
    edad: 21,
    direccion:{ 
        ciudad:"Qro" ,
        pais: "MX",
    }
};
const { nombre, edad, direccion: { ciudad } } = persona;
console.log(`Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}`);


//1. Filtra los productos cuyo precio sea mayor a 1000.
//2. Usa .map() para convertir el resultado en un nuevo arreglo con solo los nombres de esos productos.
const productos = [
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250 },
    { nombre: "Teclado", precio: 750 },
    { nombre: "Monitor", precio: 3000 }
];
const productosFiltrados = productos.filter(producto => producto.precio > 1000);
const nombresProductos = productosFiltrados.map(producto => producto.nombre);
console.log(nombresProductos); 




//Ahora con un arreglo de personas, realiza 10 siguiente:
//1. Usa .find() para buscar a la persona con nombre "Luis".
//2. Usa .forEach() para imprimir el nombre de cada persona con su edad.
//3. Usa .reduce() para sumar todas las edades y obtener un total.

const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 35 },
    { nombre: "Maria", edad: 28 }
];

//1. Buscar a la persona con nombre "Luis"
const personaLuis = personas.find(persona => persona.nombre === "Luis");
console.log(personaLuis);
//2. Imprimir el nombre de cada persona con su edad
personas.forEach(persona => {
    console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
});
//3. Sumar todas las edades
const totalEdad = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);
console.log (`Total de edades: ${totalEdad}`);