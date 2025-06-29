// Simula la lectura de un sensor (temperatura, por ejemplo) que devuelve su valor tras un pequeño retardo.

function leerSensor() {
  return new Promise(resolve => {
    setTimeout(() => resolve("35°C"), 1000);
  });
}

leerSensor().then(temp => console.log("Temperatura:", temp));
