Promise.resolve(2)
  .then(v => v * 2) // 4
  .then(v => v + 1) // 5
  .then(v => console.log("Resultado final:", v));

//   Se inicia una promesa con un valor inicial, y cada .
// then() transforma el resultado anterior. Ideal para procesos en cadena.

