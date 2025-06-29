// Carga una imagen desde una URL usando el objeto Image. 
// La promesa se resuelve cuando la imagen está completamente cargada.

function cargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject("Error al cargar imagen");
    img.src = url;
  });
}
