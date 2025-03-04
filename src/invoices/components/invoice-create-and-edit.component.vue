<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import {InvoiceService} from "../services/invoice.service.js";

export default {
  name: "invoice-create-and-edit",
  components: { CreateAndEdit },
  props: {
    invoice: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false,
      invoiceService: new InvoiceService()
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      // calculate final value
      const discountedRate = this.invoice.discountRate / this.invoice.amount
      const invoicedAmount = this.invoice.amount*(1-discountedRate)
      let calculatedRate = 0
      if (new Date(this.invoice.expirationDate) < new Date(this.invoice.emissionDate)) {
        calculatedRate = invoicedAmount * 0.05;
      }

      this.invoice.finalAmount = invoicedAmount + calculatedRate + this.invoice.taxRelief + this.invoice.studyFee + this.invoice.activationFee + this.invoice.retention + this.invoice.shipping;

      this.$emit('save-requested', this.item);
    },
    validateRuc() {
      if (this.invoice.ruc && this.invoice.ruc.toString().length > 11) {
        this.invoice.ruc = parseInt(this.invoice.ruc.toString().slice(0, 11));
      }
    },
  }
}
</script>

<template>
  <create-and-edit
    :entity="invoice"
    :visible="visible"
    entity-name="Invoice"
    @cancel-requested="onCancelRequested"
    @save-requested="onSaveRequested">
    <template #content>
      <div class="grid">
        <div class="col-6">
          <div class="flex align-items-center gap-4 mt-3">
            <label for="ruc">RUC</label>
            <pv-input-number id="name" class="flex auto" :useGrouping="false" v-model="invoice.ruc" @input="validateRuc"
                             :min="10000000000"
                             :max="99999999999"
                             :class="{'p-invalid': submitted && !invoice.ruc }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="amount">Monto nominal</label>
            <pv-input-number id="amount" class="flex-auto" v-model="invoice.amount"
                             :class="{'p-invalid': submitted && !invoice.amount }"
                             :maxFractionDigits="2"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="emissionDate">Fecha de emisión</label>
            <pv-date-picker id="emissionDate" class="flex-auto" v-model="invoice.emissionDate"
                            :class="{'p-invalid': submitted && !invoice.emissionDate }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="discountRate">Tasa de descuento</label>
            <pv-input-text id="discountRate" class="flex-auto" v-model="invoice.discountRate"
                           :class="{'p-invalid': submitted && !invoice.discountRate }"
                           :maxFractionDigits="2"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="rateType">Tipo de tasa</label>
            <pv-select id="rateType" class="flex-auto" v-model="invoice.rateType"
                       :options="['Efectiva', 'Nominal']"
                       :class="{'p-invalid': submitted && !invoice.rateType }"/>
          </div>
        </div>

        <div class="col-6">
          <div class="flex align-items-center gap-4 mt-3">
            <label for="business">Empresa</label>
            <pv-input-text id="business" class="flex-auto" v-model="invoice.business"
                           :class="{'p-invalid': submitted && !invoice.business }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="coin">Tipo de moneda</label>
            <pv-select id="coin" class="flex-auto" v-model="invoice.coin"
                       :options="['USD', 'PEN']"
                       :class="{'p-invalid': submitted && !invoice.coin }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="expirationDate">Fecha de vencimiento</label>
            <pv-date-picker id="expirationDate" class="flex-auto" v-model="invoice.expirationDate"
                            :class="{'p-invalid': submitted && !invoice.expirationDate }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="discountDate">Fecha de descuento</label>
            <pv-date-picker id="discountDate" class="flex-auto" v-model="invoice.discountDate"
                            :class="{'p-invalid': submitted && !invoice.discountDate }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="rate">Valor de tasa (%)</label>
            <pv-input-number id="rate" class="flex-auto" v-model="invoice.rate"
                             :class="{'p-invalid': submitted && !invoice.rate }"
                             :maxFractionDigits="2"/>
          </div>
        </div>
      </div>

      <p class="font-bold">Costos adicionales (Opcional)</p>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="taxRelief">Seguro Desgravamen</label>
        <pv-input-number id="taxRelief" class="flex-auto" v-model="invoice.taxRelief"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="studyFee">Comisión de estudio</label>
        <pv-input-number id="studyFee" class="flex-auto" v-model="invoice.studyFee"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="activationFee">Comisión de activación</label>
        <pv-input-number id="activationFee" class="flex-auto" v-model="invoice.activationFee"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="retention">Retención</label>
        <pv-input-number id="retention" class="flex-auto" v-model="invoice.retention"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="shipping">Portes</label>
        <pv-input-number id="shipping" class="flex-auto" v-model="invoice.shipping"
                         :maxFractionDigits="2" />
      </div>

    </template>
  </create-and-edit>
</template>

<style scoped>

</style>