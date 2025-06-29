// Simula el envío de un formulario validando que los datos ingresados sean correctos. Si los datos son válidos, se resuelve; si no, 
// se rechaza.

function enviarFormulario(datos) {
  return new Promise((resolve, reject) => {
    if (datos.nombre && datos.email) {
      resolve("Enviado");
    } else {
      reject("Error de validación");
    }
  });
}
