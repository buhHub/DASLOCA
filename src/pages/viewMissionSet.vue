<template>
  <div v-if="missionSet" class="d-flex-column ga-4 ma-8 view-mission-set-container">

    <!-- Header -->
    <div class="d-flex-row justify-space-between">
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">Missieset #{{ missionSet }}</span>
        <span class="text-h5 font-weight-bold">{{ fob?.name }}</span>
      </div>
      <div class="d-flex-row ga-2">
        <d-weapon-selector
          v-if="coupling"
          :aircraft-id="coupling.aircraftId"
          :fob-to-aircraft-id="coupling.id"
          @edit="openAircraftSelector(iMissionSet, $event)"
          @remove="changeAircraft({ id: $event, aircraftId: null })"
        ></d-weapon-selector>
        <d-mission-card
          v-for="(iTimeslot) in [...Array(nTimeslots).keys()]"
          :key="`timeslot-${iTimeslot}`"
          v-bind="{ ...getMissionByTs(iTimeslot) }"
          show-wear
        ></d-mission-card>
      </div>
    </div>

    <!-- No data -->
    <div v-if="noData" class="d-flex-column">
      <span class="text-h5 font-weight-bold">
        Er zijn geen missies gevonden voor deze FOB.
      </span>
    </div>

    <v-row class="fill-height">

      <!-- Change-rate graph -->
      <v-col cols="6" class="fill-height">
        <v-card
          flat
          variant="outlined"
          class="d-flex-column fill-height"
        >
          <v-card-item>
            <div class="d-flex-row justify-space-between">
              <div>
                <v-card-title>
                  Change-rate
                </v-card-title>
                <v-card-subtitle>
                  De kans dat een kist in onderhoud moet
                </v-card-subtitle>
              </div>
              <v-btn variant="flat" @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-item>
          <v-card-text class="d-flex flex-grow-1">
            <v-sheet border rounded color="grey" class="flex-grow-1"></v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Component graphs -->
      <v-col cols="6" class="fill-height">
        <v-card
          flat
          variant="outlined"
          class="d-flex-column fill-height"
        >
          <v-card-item>
            <div class="d-flex-row justify-space-between">
              <div>
                <v-card-title>
                  Componenten
                </v-card-title>
                <v-card-subtitle>
                  {{ selected }}
                </v-card-subtitle>
              </div>
              <v-btn variant="flat" @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-item>
          <v-card-text class="d-flex flex-grow-1">
            <v-sheet border rounded color="grey" class="flex-grow-1"></v-sheet>
          </v-card-text>
          <v-card-text class="d-flex-row ga-4 mini-graph-container pt-0">
            <d-graph-component-mini-card
              v-for="component in components"
              :title="component"
              :wear="[ 2, 4, 1, 0, 33, 13, 20]"
              :selected="component === selected"
              @select="selected = $event"
            ></d-graph-component-mini-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>

  <div v-else class="d-flex-column">

    <!-- Header -->
    <div class="d-flex-column ma-8">
      <span class="text-h4 font-weight-bold">Geen FOB geselecteerd</span>
      <span v-if="fobId" class="text-body-1">{{ 'fobId' }} is niet gevonden in de database</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFobsStore } from '../stores/fobs';
  import { useMissionsStore } from '../stores/missions';
  import { useFobToAircraftsStore } from '../stores/fobToAircrafts';

  const fobsPinia = useFobsStore();
  const missionsPinia = useMissionsStore();
  const fobToAircraftsPinia = useFobToAircraftsStore();
  
  const route = useRoute();
  const fobId = computed(() => {
    return route.query.fobId;
  });
  const missionSet = computed(() => {
    if (!route.query.ms) return null;
    return parseInt(route.query.ms);
  });

  const fob = computed(() => {
    if (!fobId.value) return null;
    return fobsPinia.getById(fobId.value);
  });

  // Calculate how many mission cards to show
  const fobMissions = computed(() => {
    if (!fobId.value) return [];
    return missionsPinia.getMissionsByFobId(fobId.value);
  });
  const nTimeslots = computed(() => {
    return Math.max(...fobMissions.value.map((mission) => mission.timeslot), -1) + 1;
  });

  // Only take missions in this missionset
  const missions = computed(() => {
    if (!missionSet.value) return [];
    return fobMissions.value
      .filter((mission) => mission.missionset === missionSet.value);
  });
  function getMissionByTs(ts) {
    if (ts === null || ts === undefined) return null;
    return missions.value.find((mission) => mission.timeslot === ts);
  };

  // Make an aircraft selection
  const couplingIdModel = ref(null);
  const couplings = computed(() => {
    return fobToAircraftsPinia.getAll
      .filter((coupling) => coupling.fobId === fobId.value && coupling.missionset === missionSet.value);
  });
  const coupling = computed(() => {
    if (couplings.value.length === 0) {
      return null;
    }
    if (!couplingIdModel.value) {
      couplingIdModel.value = couplings.value[0].id;
    }
    return couplings.value.find((coupling) => coupling.id === couplingIdModel.value);
  });

  const selected = ref('');
  const components = ['Stabilisator', 'Landingsstel', 'Motoren', 'Radar', 'Transmissie'];
</script>

<style lang="scss" scoped>
  .view-mission-set-container {
    height: calc(100% - 64px)
  }
  .mini-graph-container {
    max-height: 188px
  }
</style>
