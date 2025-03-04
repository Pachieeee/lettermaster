<script>
import {useAccountStore} from "../../stores/account.store.js";
import PortfolioList from "../components/portfolio-list.component.vue";
import PortfolioCreateDialog from "../components/portfolio-create-dialog.component.vue";
import {Portfolio} from "../model/portfolio.entity.js";
import {PortfolioService} from "../services/portfolio.service.js";

export default {
  name: "user-portfolios",
  components: { PortfolioList, PortfolioCreateDialog },
  data() {
    return {
      portfolios: [],
      portfolioService: null,
      createDialogVisible: false,
      accountStore: useAccountStore()
    }
  },
  created() {
    this.portfolioService = new PortfolioService()


    this.portfolioService.getByUserId(this.accountStore.userId).then(response => {
      this.portfolios = response.data.map(portfolio => new Portfolio(portfolio))
    }).catch(e => console.error(e));
  },
  methods: {
    newPortfolio() {
      this.createDialogVisible = true;
    },
    savePortfolio(portfolio) {

      portfolio.userId = this.accountStore.userId;

      this.portfolioService.create(portfolio).then(response => {
        this.portfolios.push(new Portfolio(response.data));
        this.createDialogVisible = false;
      }).catch(e => console.error(e));
    },
    cancelDialog() {
      this.createDialogVisible = false;
    },
    deleteThisPortfolio(id) {
      this.portfolioService.delete(id).then(() => {
        this.portfolios = this.portfolios.filter(portfolio => portfolio.id !== id);
      }).catch(e => console.error(e));
    }
  }
}
</script>

<template>
  <pv-button @click="newPortfolio">Agregar portafolio</pv-button>
  <div class="m-5"></div>
  <portfolio-list :portfolios="portfolios"/>

  <portfolio-create-dialog
    :visible="createDialogVisible"
    @save-requested="savePortfolio"
    @cancel-requested="cancelDialog"/>
</template>

<style scoped>

</style>