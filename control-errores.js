// Ejemplo clásico de manejo de errores usando .catch() al final de una cadena de promesas.

leerArchivo("inexistente.txt")
  .then(contenido => console.log("Contenido:", contenido))
  .catch(err => console.error("Error:", err));
