<template>
  <v-app>
    <d-app-bar class="sticky-top"></d-app-bar>
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
.sticky-top {
  position: sticky;
  top: 0px;
  z-index: 2;
}
.fill-width {
  width: 100% !important;
}
.clickable {
  cursor: pointer;
}
</style>