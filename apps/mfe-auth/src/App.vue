<script setup>
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import ProfileView from "./views/ProfileView.vue";

defineProps({
  view: { type: String, default: "login" },
});
</script>

<template>
  <LoginView v-if="view === 'login'" />
  <RegisterView v-else-if="view === 'register'" />
  <ProfileView v-else-if="view === 'profile'" />
  <p v-else>Vue inconnue : {{ view }}</p>
</template>
