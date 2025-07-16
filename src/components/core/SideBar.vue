<template>
  <div class="side-bar">
    <div class="d-flex-column justify-space-between side-bar-content">
      <v-btn
        prepend-icon="mdi-plus"
        color="primary"
        class="ma-8"
        variant="tonal"
        :disabled="disableCreateFobButton"
        @click="router.push({ path: '/createfob' })"
      >
        FOB Toevoegen
      </v-btn>
      <v-divider></v-divider>
      <v-card flat class="d-flex-row ga-2 align-center pa-8" @click="router.push({ path: '/' })">
        <v-icon size="20" color="primary">mdi-home</v-icon>
        <span class="text-h6 font-weight-bold text-primary">Home</span>
      </v-card>
      <v-divider></v-divider>
      <span class="ma-8 mb-0 text-body-1 font-weight-medium">Komende FOB's</span>
      <v-list class="mb-4">
        <v-list-item
          v-for="(fob, index) in fobsPinia.getUpcomingFobs"
          :key="`link-upcoming-${index}`"
          link
          class="px-8"
          prepend-icon="mdi-chevron-right"
          color="primary"
          :active="$route.query.id === fob.id"
          :title="fob.name"
          @click="router.push({ path: '/viewfob', query: { id: fob.id } })"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <span class="ma-8 mb-0 text-body-1 font-weight-medium">Actieve FOB's</span>
      <v-list class="mb-4">
        <v-list-item
          v-for="(fob, index) in fobsPinia.getActiveFobs"
          :key="`link-active-${index}`"
          link
          class="px-8"
          prepend-icon="mdi-chevron-right"
          color="primary"
          :active="$route.query.id === fob.id"
          :title="fob.name"
          @click="router.push({ path: '/viewfob', query: { id: fob.id } })"
        ></v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import header from '../../assets/header.png'
import { useFobsStore } from '../../stores/fobs';
const fobsPinia = useFobsStore();

const router = useRouter();
const route = useRoute();

const disableCreateFobButton = computed(() => route.path === '/createfob');
</script>

<style lang="scss" scoped>
.side-bar {
  position: sticky;
  top: 177px;
  width: 100%;
  /* height: calc(100% - 177px); */
  max-width: 320px;
  border-right: 1px solid #ccc;
  z-index: 1;
  background-color: white;
}
.side-bar-content {
  position: sticky;
  top: 177px;
}
</style>