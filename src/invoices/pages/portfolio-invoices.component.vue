<script>
import InvoiceList from "../components/invoice-list.component.vue";
import InvoiceCreateDialog from "../components/invoice-create-dialog.component.vue";
import InvoiceCreateAndEdit from "../components/invoice-create-and-edit.component.vue";
import {InvoiceService} from "../services/invoice.service.js";
import {Invoice} from "../model/invoice.entity.js";
import DataManager from "../../shared/components/data-manager.component.vue";

export default {
  name: "portfolio-invoices",
  components: {DataManager, InvoiceCreateDialog, InvoiceList, InvoiceCreateAndEdit },
  data() {
    return {
      title: { singular: 'Factura', plural: 'Facturas' },
      invoices: [],
      invoice: new Invoice({}),
      selectedInvoices: [],
      invoiceService: null,
      createDialogVisible: false,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  created() {
    this.invoiceService = new InvoiceService();
    const portfolioId = this.$route.params.id;
    this.invoiceService.getByPortfolioId(portfolioId).then(response => {
      this.invoices = response.data;
    }).catch(e => console.error(e));
  },
  methods: {
    findIndexById(id) {
      return this.invoices.findIndex(invoice => invoice.id === id)
    },
    // Create and Edit methods
    onNewInvoice() {
      this.invoice = new Invoice({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log('Toggled new invoice');
    },
    onEditInvoice(invoice) {
      this.invoice = new Invoice(invoice)
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log('Toggled edit invoice');
    },
    onDeleteInvoice(invoice) {
      this.invoice = new Invoice(invoice)
      this.deleteInvoice()
      console.log('Toggled delete invoice');
    },
    onDeleteSelectedInvoices(selectedInvoices) {
      this.selectedInvoices = selectedInvoices;
      this.deleteSelectedInvoices()
      console.log('Toggled delete multiple invoice');
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
      console.log('Toggled cancel invoice');
    },
    onSaveRequested(invoice) {
      this.submitted = true;
      if (invoice && invoice.ruc) {
        if (invoice.id) {
          this.updateInvoice()
        } else {
          this.createInvoice()
        }
        this.createAndEditDialogIsVisible = true;
        this.isEdit = true;
      } else {
        console.error('Invoice is undefined')
      }
    },

    // Service stuff
    createInvoice() {
      this.invoiceService.create(this.invoice).then(response => {
        let invoice = new Invoice({
          ...response.data,
          portfolioId: this.$route.params.id
        })
        this.invoices.push(invoice)
      }).catch(e => console.error(e));
    },
    updateInvoice() {
      this.invoiceService.update(this.invoice.id, this.invoice).then(response => {
        let index = this.findIndexById(this.invoice.id)
        this.invoices[index] = new Invoice(response.data)
      }).catch(e => console.error(e));
    },
    deleteInvoice() {
      this.invoiceService.delete(this.invoice.id).then(() => {
        let index = this.findIndexById(this.invoice.id)
        this.invoices.splice(index, 1)
      }).catch(e => console.error(e));
    },
    deleteSelectedInvoices() {
      this.selectedInvoices.forEach((invoice) => {
        this.invoiceService.delete(invoice.id).then(() => {
          this.invoices = this.invoices.filter((i) => i.id !== invoice.id)
        })
      })
    }
  },
  computed: {
    invoicesWithFormat() {
      return this.invoices.map(invoice => ({
        ...invoice,
        emissionDate: new Date(invoice.emissionDate).toLocaleDateString(),
        expirationDate: new Date(invoice.expirationDate).toLocaleDateString(),
        discountDate: new Date(invoice.discountDate).toLocaleDateString(),
        amountAndCoin: `${invoice.amount} ${invoice.coin}`
      }))
    }
  }
}
</script>

<template>

  <div class="flex">
    <pv-button>Ir a Portafolios</pv-button>
  </div>
  <div>
    <h2>Revisa fácilmente tu facturas</h2>
    <p class="text-xl">Aquí encontrarás todos los detalles. Además, puedes exportarlo para tener una copia CSV e imprimirlo.
      Si te equivocaste en algo, no te preocupes, puedes editarlo o eliminarlo y crear una nueva.</p>
  </div>

  <div class="m-5"></div>

  <data-manager
    :title="title"
    :items="invoicesWithFormat"
    @new-item-requested="onNewInvoice"
    @edit-item-requested="onEditInvoice"
    @delete-item-requested="onDeleteInvoice"
    @delete-selected-items-requested="onDeleteSelectedInvoices">
    <template #custom-columns>
      <pv-column field="ruc" header="RUC" style="min-width: 6rem"/>
      <pv-column field="business" header="Empresa" style="min-width: 6rem"/>
      <pv-column :sortable="true" field="amountAndCoin" header="Monto inicial" style="min-width: 7rem"/>
      <pv-column field="rateType" header="Tipo de Tasa" style="min-width: 4rem"/>
      <pv-column :sortable="true" field="rate" header="Tasa%" style="min-width: 4rem"/>
      <pv-column :sortable="true" field="emissionDate" header="Emisión" style="min-width: 7rem"/>
      <pv-column :sortable="true" field="finalAmount" header="Monto final" style="min-width: 7rem"/>
    </template>
  </data-manager>

  <invoice-create-and-edit
    :edit="isEdit"
    :invoice="invoice"
    :visible="createAndEditDialogIsVisible"
    @cancel-requested="onCancelRequested"
    @save-requested="onSaveRequested">
  </invoice-create-and-edit>

</template>

<style scoped>

</style>