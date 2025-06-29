// Ejecuta varias operaciones una tras otra, en orden, 
// esperando que cada una termine antes de pasar a la siguiente.

leerArchivo("a.txt")
  .then(() => leerArchivo("b.txt"))
  .then(() => leerArchivo("c.txt"))
  .then(() => console.log("Todos leídos"))
  .catch(error => console.error(error));
