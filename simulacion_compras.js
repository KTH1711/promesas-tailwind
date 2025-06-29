// Simula un proceso de compra donde primero se valida si hay stock disponible y 
// luego se procesa el pago. Cada paso depende del éxito del anterior.

// Validar stock

// Confirmar pago

// Resolver si todo sale bien

function simularCompra(producto, tarjeta) {
  validarStock(producto)
    .then(() => procesarPago(tarjeta))
    .then(() => console.log("Compra exitosa"))
    .catch(err => console.error("Error en la compra:", err));
}


