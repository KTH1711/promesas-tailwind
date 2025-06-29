// Simula la carga de un archivo JSON local con un pequeño retardo artificial, como si se tratara de una lectura asíncrona.

function cargarJSON() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ nombre: "Test" }), 500);
  });
}
