// Se ejecuta una promesa normal junto a una que se rechaza tras cierto tiempo.
//  Si la original tarda demasiado, se activa el timeou
function conTimeout(peticion, tiempoMax) {
  return Promise.race([
    peticion,
    new Promise((_, reject) =>
      setTimeout(() => reject("Tiempo agotado"), tiempoMax)
    )
  ]);
}

// Ejemplo:
conTimeout(fetch("https://api.example.com"), 5000)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));
