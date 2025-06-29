// Simula un proceso de autenticación básico. Se valida el usuario y la contraseña, y se responde con éxito o error según corresponda.
function login(usuario, clave) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin" && clave === "123") {
      resolve("Bienvenido");
    } else {
      reject("Error");
    }
  });
}
