<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import {InvoiceService} from "../services/invoice.service.js";
import {Portfolio} from "../model/portfolio.entity.js";

export default {
  name: "invoice-create-and-edit",
  components: { CreateAndEdit },
  props: {
    invoice: null,
    portfolio: Portfolio,
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
      this.calculateFinalAmount()
      this.invoice.portfolioId = this.portfolio.id;

      this.$emit('save-requested', this.item);
    },
    validateRuc() {
      if (this.invoice.ruc && this.invoice.ruc.toString().length > 11) {
        this.invoice.ruc = parseInt(this.invoice.ruc.toString().slice(0, 11));
      }
    },
    calculateFinalAmount() {
      // Calcular el Numero de dias
      let daysDifference = 0;

      if (this.invoice.emissionDate) { // Si hay fecha de emisión
        const expirationDate = new Date(this.invoice.expirationDate);
        const discountDate = new Date(this.portfolio.discountDate);
        const timeDifference = expirationDate - discountDate;
        daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calcular la diferencia en días
      }
      console.log('Days difference', daysDifference);

      // Calcular la tasa efectiva
      let effectiveRate = 0;
      if (daysDifference !== 0) {
        effectiveRate = ((1+(this.portfolio.compensatoryRate/100))**(daysDifference/360) - 1);
      }
      console.log('TEP:', effectiveRate);

      // Calcular el descuento%
      this.invoice.discountRate = effectiveRate/(1+effectiveRate); // Percentage
      console.log('Discount%:', this.invoice.discountRate);

      // Calcular el descuento
      let discount = -(this.invoice.amount * this.invoice.discountRate);
      console.log('Discount:', discount);

      // COSTOS ADICIONALES
      // Calcular costos iniciales
      let initialCosts = 0;
      if (daysDifference !== 0) {
        initialCosts = -(this.invoice.comission + this.invoice.printing);
      }
      console.log('Initial costs:', initialCosts);

      // Calcular costos finales
      let finalCosts = 0;
      if (daysDifference !== 0) {
        finalCosts = -(this.invoice.adminSpends + this.invoice.shipping);
      }
      console.log('Final costs:', finalCosts);

      // Calcular Seguro
      let secure = 0;
      if (this.invoice.secure !== 0) {
        secure = -(this.invoice.amount * (this.invoice.secure / 100));
      }
      console.log('Secure:', secure);

      // Calcular retención
      let retention = 0;
      if (this.invoice.retention !== 0) {
        retention = -(this.invoice.amount * (this.invoice.retention / 100));
      }
      console.log('Retention:', retention);

      // Calcular valor neto
      let netValue = this.invoice.amount + discount;
      console.log('Net value:', netValue);

      // Calcular valor final
      this.invoice.finalAmount = (netValue + initialCosts + secure + retention).toFixed(2);
      console.log('Received value:', this.invoice.finalAmount);

      // Calcular flujo / valor entregado
      let deliveredValue = -this.invoice.amount + finalCosts - retention;
      console.log('Delivered Value:', deliveredValue);

      // Calcular TCEA
      if (daysDifference !== 0) {
        this.invoice.tcea = ((((-deliveredValue/this.invoice.finalAmount)**(360/daysDifference))-1)*100).toFixed(7);
      }
      console.log('TCEA:', this.invoice.tcea);

      // Calcular IGV
      let igv = (this.invoice.finalAmount * 0.18).toFixed(2);
      console.log('IGV:', igv);

      // Calcular valor total
      this.invoice.total = (parseFloat(this.invoice.finalAmount) + parseFloat(igv)).toFixed(2);
      console.log('Total: value', this.invoice.total);
    }
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
            <label for="ruc">RUC*</label>
            <pv-input-number id="name" class="flex auto" :useGrouping="false" v-model="invoice.ruc" @input="validateRuc"
                             :min="10000000000"
                             :max="99999999999"
                             :class="{'p-invalid': submitted && !invoice.ruc }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="amount">Monto nominal*</label>
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
            <label for="rateType">Tipo de tasa*</label>
            <pv-select id="rateType" class="flex-auto" v-model="invoice.rateType"
                       :options="['Efectiva', 'Nominal']"
                       :class="{'p-invalid': submitted && !invoice.rateType }"/>
          </div>
        </div>

        <div class="col-6">
          <div class="flex align-items-center gap-4 mt-3">
            <label for="business">Empresa*</label>
            <pv-input-text id="business" class="flex-auto" v-model="invoice.business"
                           :class="{'p-invalid': submitted && !invoice.business }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="coin">Tipo de moneda*</label>
            <pv-select id="coin" class="flex-auto" v-model="invoice.coin"
                       :options="['USD', 'PEN']"
                       :class="{'p-invalid': submitted && !invoice.coin }"/>
          </div>
          <div class="flex align-items-center gap-4 mt-3">
            <label for="expirationDate">Fecha de vencimiento*</label>
            <pv-date-picker id="expirationDate" class="flex-auto" v-model="invoice.expirationDate"
                            :class="{'p-invalid': submitted && !invoice.expirationDate }"/>
          </div>
        </div>
      </div>

      <p class="font-bold">Costos adicionales (Opcional)</p>

      <div class="flex align-items-center gap-4 mt-3">
        <label for="comission">Comisión</label>
        <pv-input-number id="comission" class="flex-auto" v-model="invoice.comission"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="printing">Fotocopias</label>
        <pv-input-number id="studyFee" class="flex-auto" v-model="invoice.printing"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="shipping">Portes</label>
        <pv-input-number id="shipping" class="flex-auto" v-model="invoice.shipping"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="adminSpends">Gastos Administrativos</label>
        <pv-input-number id="adminSpends" class="flex-auto" v-model="invoice.adminSpends"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="secure">Seguro%</label>
        <pv-input-number id="secure" class="flex-auto" v-model="invoice.secure"
                         :maxFractionDigits="2" />
      </div>
      <div class="flex align-items-center gap-4 mt-3">
        <label for="retention">Retención%</label>
        <pv-input-number id="retention" class="flex-auto" v-model="invoice.retention"
                         :maxFractionDigits="2" />
      </div>

    </template>
  </create-and-edit>
</template>

<style scoped>

</style>