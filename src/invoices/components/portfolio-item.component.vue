<script>
import {Portfolio} from "../model/portfolio.entity.js";

export default {
  name: "portfolio-item",
  props: {
    portfolio: { type: Portfolio, required: true}
  },
  computed: {
    formatDate() {
      return new Date(this.portfolio.discountDate).toLocaleDateString()
    }
  },
  methods: {
    handleClick() {
      this.$emit('portfolio-clicked', this.portfolio.id)
    }
  }
}
</script>

<template>
  <pv-card class="flex shadow-3" @click="handleClick">
    <template #title>{{ portfolio.name }}</template>
    <template #subtitle>{{ portfolio.description }}</template>
    <template #content>
      <p>
        Fecha de descuento: {{ formatDate }}
      </p>
      <p>
        TEA Compensatoria: {{ portfolio.compensatoryRate }}%
      </p>

    </template>
  </pv-card>
</template>

<style scoped>

</style>