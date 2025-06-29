// Dada una lista de URLs, se cargan todas las imágenes en paralelo y se resuelve cuando todas han sido cargadas.
function cargarTodasLasImagenes(urls) {
  Promise.all(urls.map(url => cargarImagen(url)))
    .then(imagenes => mostrar(imagenes))
    .catch(error => console.error("Fallo al cargar imágenes:", error));
}
