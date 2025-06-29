// Simula una consulta a base de datos en memoria. Si el ID existe, devuelve los datos; si no, rechaza la promesa.

const usuarios = {
  1: { nombre: "Ana" },
  2: { nombre: "Luis" }
};

function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    if (usuarios[id]) {
      resolve(usuarios[id]);
    } else {
      reject("Usuario no encontrado");
    }
  });
}
