// Permite cancelar una solicitud HTTP utilizando AbortController, 
// útil en escenarios donde el usuario abandona la página o cambia de acción.

const controller = new AbortController();
const signal = controller.signal;

fetch("https://api.example.com/datos", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.warn("Solicitud cancelada");
    } else {
      console.error("Error:", err);
    }
  });

// En algún momento después
controller.abort();
