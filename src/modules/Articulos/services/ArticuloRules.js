export const codigoRule = [
    v => !!v || "El codigo es obligatorio",
    v =>
        (v && v.length <= 20) ||
        "El codigo debe tener un maximo de 20 caracteres",
    v =>
        (v && v.length >= 18) ||
        "El codigo debe tener un minimo  de 18 caracteres"
];
export const nombreRule = [v => !!v || "Este campo es  obligatorio"];
export const categoriaRule = [v => !!v || "Este campo es  obligatorio"];
export const orgfinancieroRule = [v => !!v || "Este campo es  obligatorio"];
export const estadoRule = [v => !!v || "Este campo es  obligatorio"];
export const costoRule = [
    // v => v.length >= 0 || "Ingrese un valor valido",
    v => !isNaN(parseFloat(v)) || "El numero no es valido",
    v => v > 0 || "El valor debe ser mayor que cero",
    v => v <= 6000 || "El valor debe ser menor que 6000"
];
// export const codigoRule = [
//     v => !!v || "El codigo es requerido",
//     v => Number.isInteger(Number(v)) || "El valor debe ser un entero",
//     v => v > 0 || "El valor debe ser mayor que cero",
//     v => v <= 6000 || "El valor debe ser menor que 6000"
// ];