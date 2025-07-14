<template>
  <div class="d-flex-column">
    <v-img :src="header" height="113"></v-img>
    <v-toolbar color="secondary">
      <v-app-bar-title>[Breadcrumbs]</v-app-bar-title>
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
</script>
