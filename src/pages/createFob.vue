<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>
    <!-- <HelloWorld/> -->

    <div class="d-flex-column ma-8 ga-8 fill-width">

      <!-- Header -->
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">FOB toevoegen</span>
        <span class="text-body-1">Een nieuwe FOB toevoegen</span>
      </div>

      <!-- Content -->
      <v-card flat class="d-flex-column ga-4 create-fob-card">

        <!-- Step 1: information -->
        <div class="d-flex-column ga-4 create-fob-card__step-1">
          <span class="text-body-1 font-weight-bold">1. FOB informatie</span>
          <v-text-field
            v-model="fobName"
            label="Naam"
            placeholder="Geef een naam"
            persistent-placeholder
            hide-details
            clearable
          ></v-text-field>
          <v-text-field
            v-model="fobStartDate"
            type="date"
            label="Startdatum FOB"
            placeholder="Geef een naam"
            persistent-placeholder
            hide-details
            clearable
          ></v-text-field>
        </div>
        <v-divider class="my-2"></v-divider>

        <!-- Step 2: Missionsets -->
        <div class="d-flex-column ga-4 create-fob-card__step-2">
          <span class="text-body-1 font-weight-bold">2. Missiesets inrichten</span>
          <div class="scroll-wrapper">
            <d-create-fob-missions
              :fobMissions="fobMissions"
              @update:fob-missions="fobMissions = $event"
            ></d-create-fob-missions>
          </div>
        </div>

        <!-- Save button -->
        <div>
          <v-btn color="primary" :disabled="disableSaveFob" @click="saveFob">Opslaan en sluiten</v-btn>
        </div>
      </v-card>

      <!-- Close button -->
      <div>
        <v-btn variant="outlined" color="#555">Vorige</v-btn>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useMissionsStore } from '../stores/missions';
  import { useFobsStore } from '../stores/fobs';
  const missionsPinia = useMissionsStore();
  const fobsPinia = useFobsStore();

  const fobMissions = ref([]);
  const fobName = ref('');
  const fobStartDate = ref('');

  const router = useRouter();

  const disableSaveFob = computed(() => {
    return fobMissions.value.length === 0 || fobName.value.length === 0 || fobStartDate.value.length === 0;
  })

  function saveFob() {
    if (disableSaveFob.value) return;
    const fobId = crypto.randomUUID();
    const payload = {
      id: fobId,
      name: fobName.value,
      startDate: fobStartDate.value,
    };
    fobsPinia.addData(payload);

    fobMissions.value.forEach(mission => {
      missionsPinia.addData({
        ...mission,
        fobId,
        id: crypto.randomUUID(),
      });
    });
    router.push({ path: '/' });
  }
</script>

<style lang="scss" scoped>
  .create-fob-card {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 16px;
  }
  .create-fob-card__step-1 {
    max-width: 440px;
  }
  .scroll-wrapper {
    width: 1200px;
    overflow-x: auto;
    white-space: nowrap;
  }
</style>
