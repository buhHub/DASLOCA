<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>
    <!-- <HelloWorld/> -->

    <div v-if="fob" class="d-flex-column">

      <!-- Header -->
      <div class="d-flex-column ma-8">
        <span class="text-h4 font-weight-bold">Geplande FOB</span>
        <span class="text-h5 font-weight-bold">{{ fob?.name }}</span>
        <span class="text-body-1">{{ fob?.startDate }}</span>
      </div>

      <!-- Missionsets -->
      <div
        v-for="(iMissionSet) in [...Array(nMissionSets).keys()]"
        :key="`missionset-${iMissionSet}`"
        class="d-flex-column ga-2 ma-8"
      >

        <!-- Missionset header -->
        <div class="d-flex-row align-end ga-2">
          <span class="text-body-1 font-weight-bold">Missieset #{{ iMissionSet + 1 }}</span>
          <span class="text-caption text-decoration-underline">Toon details</span>
        </div>

        <!-- Missionset row -->
        <div class="d-flex-row ga-2">
          <d-weapon-selector></d-weapon-selector>
          <d-mission-card
            v-for="(iTimeslot) in [...Array(nTimeslots).keys()]"
            :key="`timeslot-${iTimeslot}-${iMissionSet}`"
            v-bind="{ ...fobMissionByTsMs(iTimeslot, iMissionSet) }"
            show-wear
          ></d-mission-card>
        </div>

        <!-- Missionset add extra airplane -->
        <div class="d-flex-row ga-2">
          <v-btn variant="outlined" size="small" color="primary">Kist toevoegen</v-btn>
        </div>
        <v-divider></v-divider>
      </div>

    </div>

    <div v-else class="d-flex-column">

      <!-- Header -->
      <div class="d-flex-column ma-8">
        <span class="text-h4 font-weight-bold">Geen FOB geselecteerd</span>
        <span v-if="fobId" class="text-body-1">{{ fobId }} is niet gevonden in de database</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFobsStore } from '../stores/fobs';
  import { useMissionsStore } from '../stores/missions';

  const fobsPinia = useFobsStore();
  const missionsPinia = useMissionsStore();
  const route = useRoute();
  const fobId = computed(() => {
    return route.query.id;
  });
  const fob = computed(() => {
    if (!fobId.value) return {};
    return fobsPinia.getById(fobId.value);
  });
  const fobMissions = computed(() => {
    if (!fobId.value) return {};
    return missionsPinia.getMissionsByFobId(fobId.value);
  });

  const nTimeslots = computed(() => {
    return Math.max(...fobMissions.value.map((mission) => mission.timeslot)) + 1;
  });
  const nMissionSets = computed(() => {
    return Math.max(...fobMissions.value.map((mission) => mission.missionset)) + 1;
  });

  function fobMissionByTsMs(ts, ms) {
    return fobMissions.value
      .find((mission) => mission.timeslot === ts && mission.missionset === ms) ?? {};
  }
</script>
