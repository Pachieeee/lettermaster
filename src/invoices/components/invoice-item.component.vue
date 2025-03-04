<script>
import { Invoice } from "../model/invoice.entity.js";

export default {
  name: "invoice-item",
  props: {
    invoice: { type: Invoice, required: true }
  }
}
</script>

<template>
  <pv-card class="flex">
    <template #title>RUC {{ invoice.ruc }}</template>
    <template #subtitle>Tipo de moneda: {{ invoice.coin }}</template>
    <template #content>Fecha de vencimiento: {{ invoice.expirationDate }}</template>
    <template #footer>Tipo de tasa: {{invoice.rateType}}</template>
  </pv-card>
</template>

<style scoped>

</style>