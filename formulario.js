// Cada campo de un formulario se valida individualmente con una promesa. 
// El envío solo se realiza si todas las validaciones se cumplen.

function validarNombre(nombre) {
  return new Promise((resolve, reject) => {
    nombre ? resolve() : reject("Nombre requerido");
  });
}

function validarCorreo(correo) {
  return new Promise((resolve, reject) => {
    correo.includes("@") ? resolve() : reject("Correo inválido");
  });
}

Promise.all([
  validarNombre("Juan"),
  validarCorreo("juan@email.com")
])
  .then(() => console.log("Formulario válido"))
  .catch(err => console.error("Error de validación:", err));


