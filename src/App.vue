<template>
  <v-app>
    <d-app-bar></d-app-bar>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss">
.d-flex-row {
  display: flex;
  flex-direction: row;
}

.d-flex-column {
  display: flex;
  flex-direction: column;
}

.gapped {
  gap: 16px;
}
</style>