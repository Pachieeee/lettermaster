<script>
import {useAccountStore} from "../stores/account.store.js";

export default {
  name: "principal",
  data() {
    return {
      accountStore: useAccountStore()
    }
  },
  computed: {
    currentUsername() {
      return this.accountStore.currentUsername;
    }
  }
}
</script>

<template>
  <div class="text-xl line-height-4">
    <p>¡Bienvenido de nuevo a <b>Letter Master</b> {{currentUsername}}!</p>
    <p>Nos alegra tenerte de vuelta. Sabemos que la gestión de facturas es crucial para el éxito de tu negocio. Por eso, te ofrecemos las herramientas que necesitas para optimizar tu flujo de efectivo y mejorar la liquidez.</p>
    <p>¿Qué puedes hacer con <b>Letter Master</b>?</p>
    <ul>
      <li><b>Gestionar las facturas en múltiples monedas:</b> Olvídese de las complicaciones de trabajar con diferentes divisas. Nuestra plataforma te permite gestionar tus facturas en soles, dólares, euros y más, con conversiones automáticas para que siempre tengas una visión clara de tus finanzas.</li>
      <li><b>Seguimiento y control total:</b> Mantén un registro detallado de todas tus facturas, desde la emisión hasta el pago. Consulte fácilmente el estado de cada factura, recibe ofertas de pago y evita retrasos en tus cobros.</li>
      <li><b>Reportes personalizados:</b> Genere informes detallados sobre tus facturas para analizar tu flujo de efectivo.</li>
      <li><b>Seguridad y confianza:</b> Protegemos la información de tu empresa con los más altos estándares de seguridad. TUs datos están a salvo con nosotros.</li>
    </ul>
  </div>

</template>

<style scoped>

</style>