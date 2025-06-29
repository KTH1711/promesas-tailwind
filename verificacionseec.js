// Simula la verificación de una sesión de usuario mediante un token. 
// Si el token es válido, la promesa se resuelve; si no, se rechaza

function verificarSesion(token) {
  return new Promise((resolve, reject) => {
    if (token === "valido123") {
      resolve("Sesión activa");
    } else {
      reject("Sesión caducada");
    }
  });
}
