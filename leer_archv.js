// Ejecuta múltiples lecturas simuladas en paralelo usando Promise.all, y procesa los resultados cuando todas se han completado.


// Usar Promise.all con múltiples lecturas

Promise.all([
  leerArchivo("a.txt"),
  leerArchivo("b.txt")
])
  .then(resultados => procesar(resultados))
  .catch(error => console.error(error));
