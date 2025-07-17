<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>

    <!-- Selector dialog -->
    <d-aircraft-selector-dialog
      v-model="dialog"
      :fob="fob"
      :missionset="editingMissionSet"
      :selectedId="editingMissionSetAircraftId"
      @select="changeAircraft($event)"
    ></d-aircraft-selector-dialog>

    <div v-if="fob" class="d-flex-column ga-4 ma-8">

      <!-- Header -->
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">Geplande FOB</span>
        <span class="text-h5 font-weight-bold">{{ fob?.name }}</span>
        <span class="text-body-1">{{ fob?.startDate }}</span>
      </div>

      <!-- No data -->
      <div v-if="noData" class="d-flex-column">
        <span class="text-h5 font-weight-bold">
          Er zijn geen missies gevonden voor deze FOB.
        </span>
      </div>

      <!-- Missionsets -->
      <div
        v-for="(iMissionSet) in [...Array(nMissionSets).keys()]"
        :key="`missionset-${iMissionSet}`"
        class="d-flex-column ga-2"
      >

        <!-- Missionset header -->
        <div class="d-flex-row align-end ga-2">
          <span class="text-body-1 font-weight-bold">Missieset #{{ iMissionSet + 1 }}</span>
          <span class="text-caption text-decoration-underline">Toon details</span>
        </div>

        <!-- Missionset row -->
        <div
          v-for="(coupling) in fobAircraftsByMs(iMissionSet)"
          class="d-flex-row ga-2"
        >
          <d-weapon-selector
            :tail="coupling.tail"
            :fob-to-aircraft-id="coupling.id"
            :error="doubleAircraftTails.includes(coupling.tail)"
            @edit="openAircraftSelector(iMissionSet, $event)"
            @remove="changeAircraft({ id: $event, tail: null })"
          ></d-weapon-selector>
          <d-mission-card
            v-for="(iTimeslot) in [...Array(nTimeslots).keys()]"
            :key="`timeslot-${iTimeslot}-${iMissionSet}`"
            v-bind="{ ...fobMissionByTsMs(iTimeslot, iMissionSet) }"
            show-wear
          ></d-mission-card>
        </div>

        <!-- Missionset add extra airplane -->
        <div class="d-flex-row ga-2">
          <v-btn
            variant="outlined"
            size="small"
            color="primary"
            @click="openAircraftSelector(iMissionSet, null)"
          >
            Kist toevoegen
          </v-btn>
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
  import { useFobToAircraftsStore } from '../stores/fobToAircrafts';

  const fobsPinia = useFobsStore();
  const missionsPinia = useMissionsStore();
  const fobToAircraftsPinia = useFobToAircraftsStore();
  const route = useRoute();
  const fobId = computed(() => {
    return route.query.id;
  });
  const fob = computed(() => {
    if (!fobId.value) return null;
    return fobsPinia.getById(fobId.value);
  });
  const fobMissions = computed(() => {
    if (!fobId.value) return {};
    return missionsPinia.getMissionsByFobId(fobId.value);
  });

  const nTimeslots = computed(() => {
    return Math.max(...fobMissions.value.map((mission) => mission.timeslot), -1) + 1;
  });
  const nMissionSets = computed(() => {
    return Math.max(...fobMissions.value.map((mission) => mission.missionset), -1) + 1;
  });

  const noData = computed(() => { return (nTimeslots.value === 0) && (nMissionSets.value === 0); })

  function fobMissionByTsMs(ts, ms) {
    return fobMissions.value
      .find((mission) => mission.timeslot === ts && mission.missionset === ms) ?? {};
  }

  function fobAircraftsByMs(ms) {
    if (!fob.value) return null;
    const output = fobToAircraftsPinia.getAll.filter((unit) => unit.missionset === ms && unit.fobId === fobId.value);
    if (output.length > 0) return output;

    // Return a single empty to make it possible for the user to make a selection.
    return [{ missionset: ms, tail: null }];
  };

  const doubleAircraftTails = computed(() => {
    const allCouplings = fobToAircraftsPinia.getAll.filter((unit) => unit.fobId === fobId.value);
    const counting = allCouplings.reduce((acc, sample) => ({
      ...acc,
      [sample.tail]: (acc[sample.tail] ?? 0) + 1,
    }), {});
    return Object.entries(counting)
      .filter(([tail, amount]) => amount >= 2)
      .map(([tail, amount]) => tail);
  })

  const dialog = ref(false);
  const editingMissionSet = ref(null);
  const editingMissionSetAircraftId = ref(null);

  function openAircraftSelector(ms, fobToAircraftId) {
    editingMissionSet.value = ms;
    editingMissionSetAircraftId.value = fobToAircraftId;
    dialog.value = true;
  };

  function changeAircraft(data) {
    if (!data) return;
    console.log(data);
    if (!data.tail) {
      fobToAircraftsPinia.removeData(data.id);
    } else {
      if (data.id) {
        fobToAircraftsPinia.modifyData(data);
      } else {
        fobToAircraftsPinia.addData(data);
      }
    }
    dialog.value = false;
  };

  // Nothing is selected when dialog is closed
  watch(dialog, (nValue, oValue) => {
    if (!nValue) {
      editingMissionSet.value = null;
      editingMissionSetAircraftId.value = null;
    }
  })
</script>
