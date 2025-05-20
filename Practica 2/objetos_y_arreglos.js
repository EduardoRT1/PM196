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


