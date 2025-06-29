// Usa la API de geolocalización del navegador para obtener la ubicación del usuario. 
// 4Se resuelve con las coordenadas o se rechaza si ocurre un error.


// Usar navigator.geolocation
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error)
    );
  });
}
