// Iniciar la lectura de archivo

// Devolver una promesa que se resuelve con el contenido

function leerArchivo(path) {
  return new Promise((resolve, reject) => {
    if (path) {
      resolve("Contenido leído");
    } else {
      reject("Error al leer");
    }
  });
}
// Simula la lectura de un archivo local, como si fuera una operación asincrónica 
// que puede tardar o fallar. Es útil para entender
//  cómo manejar operaciones que no son instantáneas.