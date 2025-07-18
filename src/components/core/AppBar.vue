<template>
  <div class="d-flex-column appbar">
    <v-img :src="header" height="113"></v-img>
    <v-toolbar color="secondary">
      <v-app-bar-title>
        <div class="d-flex-row align-center ga-2 clickable" @click="router.push({ path: '/' })">
          <v-icon size="18">mdi-home</v-icon>
          Home (DASLOCA)
        </div>
      </v-app-bar-title>
      <div class="d-class-row gapped mr-4">
        <v-btn variant="text" prepend-icon="mdi-airplane-cog">
          Beheer kisten
        </v-btn>
        <v-btn variant="text" prepend-icon="mdi-account-circle">
          Gebruiker
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import header from '../../assets/header.png'
const router = useRouter();
</script>

<style lang="scss" scoped>
.appbar {
  background-color: white;
}
</style>