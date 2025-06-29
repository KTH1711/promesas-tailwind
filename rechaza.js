// Ejecuta una promesa que se comporta diferente según el valor recibido. Muy útil para flujos condicionales.

function verificarValor(valor) {
  return new Promise((resolve, reject) => {
    if (valor > 10) {
      resolve("Valor válido");
    } else {
      reject("Valor demasiado bajo");
    }
  });
}

verificarValor(12)
  .then(msg => console.log(msg))
  .catch(err => console.error(err));
