// Lanza varias promesas con setTimeout de duraciones distintas y espera a que todas terminen usando Promise.all.

Promise.all([esperar(1000), esperar(2000)])
  .then(() => console.log("Ambas esperas completadas"))
  .catch(err => console.error(err));
