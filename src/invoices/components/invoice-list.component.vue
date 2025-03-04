<script>
import InvoiceItem from './invoice-item.component.vue'

export default {
  name: "invoice-list",
  components: {InvoiceItem},
  props: {
    invoices: { type: Array, required: true }
  }
}
</script>

<template>
  <div>
    <div v-for="invoice in invoices" :key="invoice.id">
      <invoice-item :invoice="invoice"/>
      <div class="m-3"></div>
    </div>
  </div>
</template>

<style scoped>

</style>