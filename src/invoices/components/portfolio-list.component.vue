<script>
import PortfolioItem from './portfolio-item.component.vue'
import {useRouter} from "vue-router";

export default {
  name: "portfolio-list",
  components: {PortfolioItem},
  props: {
    portfolios: { type: Array, required: true }
  },
  setup() {
    const router = useRouter();
    const handlePortfolioClicked = (portfolioId) => {
      router.push({ name: 'invoices', params: { id: portfolioId}})
    }
    return { handlePortfolioClicked }
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-4" v-for="portfolio in portfolios" :key="portfolio.name">
      <portfolio-item :portfolio="portfolio" @portfolio-clicked="handlePortfolioClicked" />
    </div>
  </div>
</template>

<style scoped>

</style>