// Ejecuta varias funciones asíncronas en orden. Cada paso depende del anterior, 
// lo cual es muy común en flujos de procesamiento.

function paso1() {
  return Promise.resolve("Paso 1 completado");
}

function paso2() {
  return Promise.resolve("Paso 2 completado");
}

function paso3() {
  return Promise.resolve("Paso 3 completado");
}

paso1()
  .then(res1 => {
    console.log(res1);
    return paso2();
  })
  .then(res2 => {
    console.log(res2);
    return paso3();
  })
  .then(res3 => console.log(res3))
  .catch(err => console.error(err));


