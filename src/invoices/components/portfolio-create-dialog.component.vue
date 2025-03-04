<script>
import {Portfolio} from "../model/portfolio.entity.js";
import {DatePicker as PvDatePicker} from "primevue";

export default {
  name: "portfolio-create-dialog",
  components: {PvDatePicker},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      portfolio: new Portfolio({}),
      submitted: false,
    }
  },
  methods: {
    savePortfolio() {
      this.submitted = true;
      this.$emit('save-requested', this.portfolio);
    },
    cancel() {
      this.$emit('cancel-requested');
    }
  }
}
</script>

<template>
  <pv-dialog :visible="visible" modal header="Agregar portafolio" @hide="cancel">
    <p class="block mb-3">Ingrese el nombre del portafolio</p>
    <div class="flex items-center gap-4 mb-4">
      <pv-input-text id="name" class="flex-auto" autocomplete="off" v-model="portfolio.name"/>
    </div>
    <p class="block mb-3">Describa el portafolio</p>
    <div class="flex items-center gap-4 mb-4">
      <pv-input-text id="description" class="flex-auto" autocomplete="off" v-model="portfolio.description"/>
    </div>
    <p class="block mb-3">Ingrese la fecha de descuento</p>
    <div class="flex items-center gap-4 mb-4">
      <pv-date-picker id="discountDate" class="flex-auto" autocomplete="off" v-model="portfolio.discountDate"/>
    </div>
    <p class="block mb-3">Ingrese la TEA compensatoria del banco asociado (%)</p>
    <div class="flex items-center gap-4 mb-4">
      <pv-input-text id="compensatoryRate" class="flex-auto" autocomplete="off" v-model="portfolio.compensatoryRate"/>
    </div>
    <template #footer>
      <pv-button label="Cancelar" icon="pi pi-times" class="bg-red-500 border-none" @click="cancel" />
      <pv-button label="Guardar" icon="pi pi-check" class="bg-blue-500 border-none" @click="savePortfolio" />
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>