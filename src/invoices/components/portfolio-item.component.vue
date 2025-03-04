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
    <template #subtitle>Creación: {{ formatDate }}</template>
    <template #content>Descripción: {{ portfolio.description }}</template>
  </pv-card>
</template>

<style scoped>

</style>