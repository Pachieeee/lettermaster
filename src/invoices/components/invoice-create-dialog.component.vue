<script>
import {Invoice} from "../model/invoice.entity.js";

export default {
  name: "invoice-create-dialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      invoice: new Invoice({}),
      submitted: false,
      coins: [
        'USD',
        'PEN',
        'EUR'
      ],
      rates: [
          'Efectiva',
          'Nominal'
      ]
    }
  },
  methods: {
    saveInvoice() {
      this.submitted = true;
      this.invoice.portfolioId = this.$route.params.id;
      this.$emit('save-requested', this.invoice);
    },
    cancel() {
      this.$emit('cancel-requested');
    }
  }
}
</script>

<template>
  <pv-dialog :visible="visible" modal header="Agregar factura" @hide="cancel">
    <div class="flex items-center gap-4 mb-4">
      <label for="name">RUC</label>
      <pv-input-number id="name" class="flex auto" :useGrouping="false" v-model="invoice.ruc" @input="validateRuc"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="amount">Monto nominal</label>
      <pv-input-number id="amount" class="flex-auto" :maxFractionDigits="2" v-model="invoice.amount"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="coin">Moneda</label>
      <pv-select id="coin" class="flex-auto" :options="coins" v-model="invoice.coin"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="emissionDate">Fecha de emisión</label>
      <pv-date-picker id="emissionDate" class="flex-auto" autocomplete="off" v-model="invoice.emissionDate"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="expirationDate">Fecha de vencimiento</label>
      <pv-date-picker id="expirationDate" class="flex-auto" autocomplete="off" v-model="invoice.expirationDate"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="discountRate">Tasa de descuento</label>
      <pv-input-text id="discountRate" class="flex-auto" autocomplete="off" v-model="invoice.discountRate"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="discountDate">Fecha de descuento</label>
      <pv-date-picker id="discountDate" class="flex-auto" autocomplete="off" v-model="invoice.discountDate"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="rateType">Tipo de tasa</label>
      <pv-select id="rateType" class="flex-auto" :options="rates" v-model="invoice.rateType"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="rateType">Valor de tasa (%)</label>
      <pv-input-number id="rate" class="flex-auto" :maxFractionDigits="2" v-model="invoice.rate"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="costs">Costos adicionales</label>
      <pv-input-number id="costs" class="flex-auto" :maxFractionDigits="2" v-model="invoice.costs"/>
    </div>
    <template #footer>
      <pv-button label="Cancelar" icon="pi pi-times" class="bg-red-500 border-none" @click="cancel" />
      <pv-button label="Guardar" icon="pi pi-check" class="bg-blue-500 border-none" @click="saveInvoice" />
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>