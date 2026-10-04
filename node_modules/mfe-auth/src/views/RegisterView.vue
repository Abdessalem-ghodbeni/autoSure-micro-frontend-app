<script setup>
import { reactive, ref } from "vue";
import { emitEvent, EVENTS } from "@autosure/shared";
import { register } from "../services/authApi.js";

const form = reactive({
  nom: "",
  prenom: "",
  email: "",
  numeroPhone: "",
  password: "",
  confirmation: "",
});
const errors = reactive({});
const serverError = ref("");
const success = ref(false);
const loading = ref(false);

function validate() {
  Object.keys(errors).forEach((key) => delete errors[key]);
  if (!form.nom.trim()) errors.nom = "Le nom est obligatoire.";
  if (!form.prenom.trim()) errors.prenom = "Le prénom est obligatoire.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email invalide.";
  if (!/^[0-9+ ]{8,15}$/.test(form.numeroPhone))
    errors.numeroPhone = "Téléphone invalide.";
  if (form.password.length < 8) errors.password = "8 caractères minimum.";
  if (form.password !== form.confirmation)
    errors.confirmation = "Les mots de passe sont différents.";
  return Object.keys(errors).length === 0;
}

async function onSubmit() {
  serverError.value = "";
  if (!validate()) return;
  loading.value = true;
  try {
    await register(form);
    success.value = true;
  } catch (e) {
    serverError.value = e.message;
  } finally {
    loading.value = false;
  }
}

function goToLogin() {
  emitEvent(EVENTS.NAVIGATE, "/login");
}
</script>

<template>
  <section class="auth-card">
    <h2>Créer un compte</h2>

    <as-alert v-if="serverError" type="error">{{ serverError }}</as-alert>

    <div v-if="success">
      <as-alert type="success"
        >Compte créé avec succès. Vous pouvez maintenant vous
        connecter.</as-alert
      >
      <as-button @click="goToLogin">Aller à la connexion</as-button>
    </div>

    <div v-else>
      <as-input
        label="Nom"
        :value="form.nom"
        :error="errors.nom"
        @value-changed="form.nom = $event.detail"
      ></as-input>
      <as-input
        label="Prénom"
        :value="form.prenom"
        :error="errors.prenom"
        @value-changed="form.prenom = $event.detail"
      ></as-input>
      <as-input
        label="Email"
        type="email"
        :value="form.email"
        :error="errors.email"
        @value-changed="form.email = $event.detail"
      ></as-input>
      <as-input
        label="Téléphone"
        :value="form.numeroPhone"
        :error="errors.numeroPhone"
        @value-changed="form.numeroPhone = $event.detail"
      ></as-input>
      <as-input
        label="Mot de passe"
        type="password"
        :value="form.password"
        :error="errors.password"
        @value-changed="form.password = $event.detail"
      ></as-input>
      <as-input
        label="Confirmer le mot de passe"
        type="password"
        :value="form.confirmation"
        :error="errors.confirmation"
        @value-changed="form.confirmation = $event.detail"
        @enter-pressed="onSubmit"
      ></as-input>

      <as-button :loading="loading" @click="onSubmit"
        >Créer mon compte</as-button
      >

      <p class="auth-link">
        Déjà inscrit ?
        <a href="/login" @click.prevent="goToLogin">Se connecter</a>
      </p>
    </div>
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
