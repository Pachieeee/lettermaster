<script>
import {useAccountStore} from "../../stores/account.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignIn() {
      let accountStore = useAccountStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      accountStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="grid min-h-screen w-screen">
    <div class="col-6">
      <img src="../../assets/bank.png" alt="bank" class="w-full h-full"/>
    </div>
    <div class="col-5 align-self-center">
      <div class="flex m-5 justify-content-center">
        <img src="../../assets/lettermaster-logo.png" alt="logo" class="h-7rem" />
        <div class="m-3"></div>
        <p class="text-4xl font-bold justify-content-center">Letter Master</p>
      </div>
      <div class="flex justify-content-center">
        <h3>Inicio de Sesión</h3>
      </div>
      <div class="flex justify-content-center">
        <form @submit.prevent="onSignIn">
          <div class="p-fluid">
            <div class="field mt-5">
              <pv-float-label>
                <pv-input-text id="username" placeholder="Username" v-model="username" :class="{'p-invalid': !username}"/>
                <small v-if="!username" class="p-invalid pl-3">El nombre de usuario es obligatorio.</small>
              </pv-float-label>
            </div>
            <div class="field mt-5">
              <pv-float-label>
                <pv-password id="password" placeholder="Password" v-model="password" :class="{'p-invalid': !password}" :feedback="false"/>
                <small v-if="!password" class="p-invalid pl-3">La contraseña es obligatoria.</small>
              </pv-float-label>
            </div>
            <div class="p-field mt-5 flex justify-content-center">
              <pv-button type="submit">Iniciar Sesión</pv-button>
            </div>
            <div class="mt-5 flex justify-content-center">
              ¿No tienes una cuenta?
              <router-link to="/sign-up">Regístrate</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>