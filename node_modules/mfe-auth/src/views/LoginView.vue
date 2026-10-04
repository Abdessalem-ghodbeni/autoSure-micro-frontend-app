<script setup>
import { reactive, ref } from "vue";
import { emitEvent, EVENTS } from "@autosure/shared";
import { login } from "../services/authApi.js";

const form = reactive({ email: "", password: "" });
const error = ref("");
const loading = ref(false);

async function onSubmit() {
  error.value = "";
  if (!form.email || !form.password) {
    error.value = "Veuillez remplir tous les champs.";
    return;
  }
  loading.value = true;
  try {
    await login(form);
    emitEvent(EVENTS.NAVIGATE, "/dashboard");
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

function goToRegister() {
  emitEvent(EVENTS.NAVIGATE, "/register");
}
</script>

<template>
  <section class="auth-card">
    <h2>Connexion</h2>

    <as-alert v-if="error" type="error">{{ error }}</as-alert>

    <as-input
      label="Email"
      type="email"
      :value="form.email"
      @value-changed="form.email = $event.detail"
      @enter-pressed="onSubmit"
    ></as-input>

    <as-input
      label="Mot de passe"
      type="password"
      :value="form.password"
      @value-changed="form.password = $event.detail"
      @enter-pressed="onSubmit"
    ></as-input>

    <as-button :loading="loading" @click="onSubmit">Se connecter</as-button>

    <p class="auth-link">
      Pas encore de compte ?
      <a href="/register" @click.prevent="goToRegister">Créer un compte</a>
    </p>
  </section>
</template>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 40px auto;
  padding: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
h2 {
  margin-top: 0;
}
as-button {
  display: block;
}
.auth-link {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
}
</style>
