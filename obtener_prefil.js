// Ejemplo de promesas encadenadas. Primero se realiza un login; si tiene éxito, se continúa con otra promesa que obtiene el perfil del usuario.

// Hacer login

// Luego obtener perfil si login exitoso

login(usuario, clave)
  .then(() => obtenerPerfil(usuario))
  .then(perfil => mostrar(perfil))
  .catch(error => console.error(error));
