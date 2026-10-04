<script setup>
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import ProfileView from "./views/ProfileView.vue";

defineProps({
  view: { type: String, default: "login" },
  navigate: { type: Function, required: true },
});
</script>
<template>
  <LoginView v-if="view === 'login'" :navigate="navigate" />
  <RegisterView v-else-if="view === 'register'" :navigate="navigate" />
  <ProfileView v-else-if="view === 'profile'" />
  <p v-else>Vue inconnue : {{ view }}</p>
</template>
