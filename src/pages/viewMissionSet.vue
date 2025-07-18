<template>
  <div v-if="missionSet !== null" class="d-flex-column ga-4 ma-8 view-mission-set-container">

    <!-- Header -->
    <div class="d-flex-row justify-space-between">
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">Missieset #{{ missionSet + 1 }}</span>
        <span class="text-h5 font-weight-bold">{{ fob?.name }}</span>
      </div>
      <div class="d-flex-row ga-2">
        <d-weapon-selector
          v-if="coupling"
          :aircraft-id="coupling?.aircraftId"
          :fob-to-aircraft-id="coupling?.id"
          @edit="openAircraftSelector(iMissionSet, $event)"
          @remove="changeAircraft({ id: $event, aircraftId: null })"
        ></d-weapon-selector>
        <d-mission-card
          v-for="(iTimeslot) in [...Array(nTimeslots).keys()]"
          :key="`timeslot-${iTimeslot}`"
          v-bind="{ ...getMissionByTs(iTimeslot) }"
          :wear="changeRate[iTimeslot + 1]"
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
          class="d-flex-column fill-height component"
        >
          <v-card-item>
            <div class="d-flex-row justify-space-between align-center">
              <div>
                <v-card-title>
                  Change-rate
                </v-card-title>
                <v-card-subtitle>
                  De kans dat een kist in onderhoud moet
                </v-card-subtitle>
              </div>
              <div class="d-flex-row ga-2 align-center">
                <d-change-rate-chip :value="Math.min(...changeRate)"></d-change-rate-chip>
                <v-icon size="16">mdi-chevron-double-right</v-icon>
                <d-change-rate-chip :value="Math.max(...changeRate)"></d-change-rate-chip>
              </div>
            </div>
          </v-card-item>
          <v-card-text class="d-flex flex-grow-1 pa-4">
            <d-line-chart
              :data="changeRateChart"
              :options="changeRateChartOptions"
              class="pa-4"
            ></d-line-chart>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Component graphs -->
      <v-col cols="6" class="fill-height">
        <v-card
          flat
          class="d-flex-column fill-height component"
        >
          <v-card-item>
            <div class="d-flex-row justify-space-between">
              <div>
                <v-card-title>
                  Componenten
                </v-card-title>
                <v-card-subtitle>
                  {{ selectedComponent }}
                </v-card-subtitle>
              </div>
              <div class="d-flex-row ga-2 align-center">
                <d-change-rate-chip
                  :value="Math.min(...getRates(wordToAsciiProductNoZero(selectedComponent)))"
                ></d-change-rate-chip>
                <v-icon size="16">mdi-chevron-double-right</v-icon>
                <d-change-rate-chip
                  :value="Math.max(...getRates(wordToAsciiProductNoZero(selectedComponent)))"
                ></d-change-rate-chip>
              </div>
            </div>
          </v-card-item>
          <v-card-text class="d-flex flex-grow-1">
            <d-line-chart
              :data="getChartData(getRates(wordToAsciiProductNoZero(selectedComponent)))"
              :options="changeRateChartOptions"
              class="pa-4"
            ></d-line-chart>
          </v-card-text>
          <v-row class="pa-8 ga-4">
            <v-col v-for="component in components" class="pa-0">
              <d-graph-component-mini-card
                :title="component"
                :wear="getRates(wordToAsciiProductNoZero(component))"
                :selected="component === selectedComponent"
                @select="selectedComponent = $event"
              ></d-graph-component-mini-card>
            </v-col>
          </v-row>
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
  import { useTailsStore } from '../stores/tails';
  import { useFobToAircraftsStore } from '../stores/fobToAircrafts';
  import { calculateChangeRate } from '../consts/helpers';

  const fobsPinia = useFobsStore();
  const tailsPinia = useTailsStore();
  const missionsPinia = useMissionsStore();
  const fobToAircraftsPinia = useFobToAircraftsStore();
  
  const route = useRoute();
  const fobId = computed(() => {
    return route.query.fobId;
  });
  const missionSet = computed(() => {
    console.log(route.query.ms)
    if (route.query.ms === null || route.query.ms === undefined) return null;
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
    if (missionSet.value === null) return [];
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

  const components = ['Stabilisator', 'Landingsstel', 'Motoren', 'Radar', 'Transmissie'];
  const selectedComponent = ref(components[0]);

  function getRates(multiplier) {
    return calculateChangeRate(
      fob.value, missions.value, nTimeslots.value,
      tailsPinia.getById(coupling.value?.aircraftId), multiplier,
    );
  };

  const changeRate = computed(() => {
    return getRates(1);
  });

  const changeRateChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  function getChartData(inputData) {
    return {
      labels: [...inputData.keys()],
      datasets: [
        {
          borderColor: '#B71C1C',
          data: inputData,
        },
      ],
    };
  };

  const changeRateChart = computed(() => {
    return getChartData(changeRate.value);
  });

  function wordToAsciiProductNoZero(word) {
    let product = 1;
    for (let i = 0; i < word.length; i++) {
      product *= word.charCodeAt(i);
    }

    // Strip trailing zeros by dividing by 10 until no trailing zero remains
    while (product % 10 === 0) {
      product /= 10;
    }

    return product;
  }
  </script>

<style lang="scss" scoped>
  .view-mission-set-container {
    height: calc(100% - 96px)
  }
  .mini-graph-container {
    max-height: 188px
  }
  .component {
   border: 1px solid #D9D9D9;
  }
</style>
