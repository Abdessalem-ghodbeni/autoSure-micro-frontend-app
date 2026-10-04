<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { authStore, parseJwt } from "@autosure/shared";

const session = ref(authStore.getState());
let unsubscribe;

onMounted(() => {
  unsubscribe = authStore.subscribe((newState) => {
    session.value = newState;
  });
});
onUnmounted(() => unsubscribe?.());

const expiration = computed(() => {
  const payload = session.value.token ? parseJwt(session.value.token) : null;
  return payload?.exp
    ? new Date(payload.exp * 1000).toLocaleString("fr-FR")
    : "inconnue";
});
</script>

<template>
  <section class="profile-card">
    <h2>Mon profil</h2>
    <p><strong>Email :</strong> {{ session.user?.email }}</p>
    <p><strong>Rôle :</strong> {{ session.user?.role ?? "non précisé" }}</p>
    <p><strong>Session valable jusqu'au :</strong> {{ expiration }}</p>
  </section>
</template>

<style scoped>
.profile-card {
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
</style>
