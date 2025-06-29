// Usa setTimeout dentro de una promesa para simular una espera o retraso, 
// muy útil para delays o animaciones.
function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Listo"), ms);
  });
}
