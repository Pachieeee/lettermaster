<script>
const defaultStyle = { width: '400px'};

export default {
  name: "create-and-edit",
  props: {entity: null, visible: Boolean, entityName: 'Factura', edit: Boolean, size: 'default'},
  methods: {
    onCancel() {
      this.$emit('cancel-requested');
    },
    onSave() {
      this.$emit('save-requested', this.entity);
    },
    getHeaderTitle() {
      return `${this.edit ? 'Editar' : 'Nueva'} factura`;
    },
    getSubmitLabel() {
      return this.edit ? 'Editar' : 'Crear';
    },
    getDialogStyle() {
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? {width: '600px'} : defaultStyle;
      dialogStyle = this.size === 'large' ? {width: '800px'} : defaultStyle;

      return dialogStyle;
    }
  }
}

</script>

<template>
  <pv-dialog v-bind:visible="visible" :modal="true" :style="getDialogStyle" class="p-fluid"
             :header="entityName">
    <template #header>
      <div class="flex justify-content-start">
        <h2>{{ getHeaderTitle() }}</h2>
      </div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-end">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text"
                   icon="pi pi-check" @click="onSave"/>
        <pv-button type="button" label="Cancelar" severity="secondary" class="p-button-text"
                   icon="pi pi-times" @click="onCancel"/>
      </div>
    </template>
  </pv-dialog>

</template>

<style scoped>
</style>