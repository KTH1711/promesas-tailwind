//  Llamar a una API con fetch
// Usa fetch() para hacer una llamada HTTP y procesar la respuesta en formato JSON. 
// Este patrón es común en aplicaciones web que interactúan con APIs externas.

function obtenerDatos(url) {
  return fetch(url).then(res => res.json());
}

