<template>
  <div class="d-flex-column appbar">
    <v-img :src="header" height="113"></v-img>
    <v-toolbar color="secondary" class="px-8">
      <div class="d-flex-row align-center ga-2 clickable" @click="router.push({ path: '/' })">
        <v-icon size="18">mdi-home</v-icon>
        Home (DASLOCA)
      </div>
      <v-spacer></v-spacer>
      <div class="d-class-row gapped mr-n4">
        <v-btn
          :variant="buttonVariant[stateLocalStorageButton]"
          :prepend-icon="buttonIcon[stateLocalStorageButton]"
          :color="buttonColor[stateLocalStorageButton]"
          :disabled="stateLocalStorageButton >= 3"
          @click="stateLocalStorageButton = Math.min(3, stateLocalStorageButton + 1)"
        >
          {{ buttonText[stateLocalStorageButton] }} ({{ stateLocalStorageTimer }})
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-airplane-cog"
          :disabled="route.path === '/admin/aircrafts'"
          @click="router.push({ path: '/admin/aircrafts' })"
        >
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
const route = useRoute();
const router = useRouter();
const stateLocalStorageButton = ref(0);
const stateLocalStorageTimer = ref(0);

const buttonColor = ['transparent', 'white', 'error', 'success'];
const buttonText = ['Placeholder', 'Data resetten', 'Nogmaals om te bevestigen', 'Verwijderd, pagina ververst in '];
const buttonIcon = ['', 'mdi-refresh', 'mdi-refresh mdi-spin', 'mdi-archive-check-outline'];
const buttonVariant = ['', 'outlined', 'elevated', 'elevated'];

function decreaseTimer(parity) {
  if (parity === stateLocalStorageTimer.value) {
    stateLocalStorageTimer.value -= 1;
  }
}

watch(stateLocalStorageButton, (nValue, oValue) => {
  if (nValue === 3) {
    localStorage.clear();
  }
  if (nValue) {
    stateLocalStorageTimer.value = 5;
  }
})

watch(stateLocalStorageTimer, (nValue, oValue) => {
  if (nValue) {
    setTimeout(decreaseTimer, 1000, nValue);
  } else {
    if (stateLocalStorageButton.value === 3) {
      location.reload();
    }
    stateLocalStorageButton.value = 0;
  }
})
</script>

<style lang="scss" scoped>
.appbar {
  background-color: white;
}
</style>