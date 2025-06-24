// js/pagos.js
document.addEventListener('DOMContentLoaded', function () {
  paypal.Buttons({
    createOrder: function (data, actions) {
      const monto = document.getElementById("producto").value || "100.00";
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: monto
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        const nombre = details.payer.name.given_name;
        alert(`✅ ¡Gracias, ${nombre}! Tu pago fue completado exitosamente.`);
      });
    },
    onError: function (err) {
      console.error('❌ Error en el pago:', err);
      alert('Ocurrió un error al procesar el pago. Inténtalo nuevamente.');
    }
  }).render('#paypal-button-container');
});
