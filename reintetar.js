// Permite reintentar una operación varias veces si falla, 
// hasta alcanzar el número máximo de intentos definidos.
// Intentar varias veces

// Reintentar si falla y aún quedan intentos4


function reintentar(fn, intentos) {
  return fn().catch(err => {
    if (intentos > 1) {
      return reintentar(fn, intentos - 1);
    } else {
      return Promise.reject("Falló tras varios intentos");
    }
  });
}


