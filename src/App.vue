<script>
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {useAccountStore} from "./stores/account.store.js";

import homeIcon from './assets/home.png';
import boxIcon from './assets/box.png';
import supportIcon from './assets/support.png';
import userIcon from './assets/user.png';

export default {
  name: 'app',
  title: 'LetterMaster',
  data() {
    return {
      visible: true,
      items: [
        {label: 'Menú Principal', to: '/home', img: homeIcon},
        {label: 'Gestión de Facturas', to: '/portfolios', img: boxIcon},
        {label: 'Soporte al Cliente', to: '/support', img: supportIcon},
        {label: 'Mi Cuenta', to: '/account', img: userIcon}
      ],
      router: useRouter(),
      accountStore: useAccountStore()
    }
  },
  setup() {
    const route = useRoute();
    const pageTitle = computed(() => route.meta.title);
    return { pageTitle };
  },
  computed: {
    isSignedIn() {
      return this.accountStore.isSignedIn;
    }
  },
  methods: {
    onSignOut() {
      this.accountStore.signOut(this.router);
    }
  }
}
</script>

<template>
    <div class="grid min-h-screen w-screen">
      <div class="col-3 surface-300" v-if="isSignedIn">
        <div class="flex m-5 justify-content-center">
          <img src="./assets/lettermaster-logo.png" alt="logo" class="h-7rem" />
          <div class="m-3"></div>
          <p class="text-4xl font-bold justify-content-center">Letter Master</p>
        </div>

        <router-link
          v-for="item in items"
          :key="item.label"
          v-slot="{navigate, href}"
          :to="item.to" custom>
          <div class="flex">
            <pv-card :href="href" class="flex shadow-none surface-300 border-noround w-full h-6rem justify-content-center" @click="navigate">
              <template #title>
                <div class="flex ">
                  <img :src="item.img" alt="icon" class="h-4rem " />
                  <div class="m-3"></div>
                  <p class="font-bold">{{item.label}}</p>
                </div>
              </template>
            </pv-card>
          </div>
        </router-link>
        <pv-card class="flex shadow-none surface-300 border-noround w-full h-6rem justify-content-center" @click="onSignOut">
          <template #title>
            <p class="font-bold">Cerrar Sesión</p>
          </template>
        </pv-card>
      </div>

      <div class="col-9">
        <div class="h-8rem surface-300 flex" v-if="isSignedIn">
          <div class="m-4"></div>
          <p class="text-4xl font-bold">{{pageTitle}}</p>
        </div>
        <div class="p-4 flex-grow-1">
          <router-view/>
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>
