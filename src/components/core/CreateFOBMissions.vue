<template>
  <div
    class="missionset-container"
    :style="{
      '--n-timeslots': nTimeslots,
      '--n-missionsets': nMissionSets,
    }"
  >
    <!-- Top row from left to right: -->
    <div class="item fill-height d-flex-row align-center px-2 text-body-1 font-weight-bold">
      Tijdsloten
    </div>
    <div
      v-for="n in [...Array(nTimeslots).keys()]"
      :key="`header-${n}`"
      class="item"
      :class="{ 'colored-column': n % 2 === 0 }"
    >
      <div class="fill-height justify-space-between d-flex-row align-center pa-4 text-body-1 font-weight-bold">
        #{{ n + 1 }}
        <v-btn variant="outlined" size="small">
          <v-icon>mdi-menu</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in columnActions"
                :key="index"
                :value="index"
                :disabled="item.disabled"
                @click="item.action(n)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </div>

    <!-- Iterate over each missionset: -->
    <template v-for="iMissionSet in [...Array(nMissionSets).keys()]" :key="`row-${iMissionSet}`">
      <div
        class="item fill-height justify-space-between d-flex-row align-start px-2 py-4 text-body-1 font-weight-bold"
      >
        Missieset #{{ iMissionSet + 1 }}
        <v-btn variant="outlined" size="small">
          <v-icon>mdi-menu</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in rowActions"
                :key="index"
                :value="index"
                :disabled="item.disabled"
                @click="item.action(iMissionSet)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
      <div
        v-for="n in [...Array(nTimeslots).keys()]"
        :key="`header-${n}`"
        class="item"
        :class="{ 'colored-column': n % 2 === 0 }"
      >
        <div class="fill-height d-flex-row align-center pa-4 text-body-1 font-weight-bold">
          <d-mission-card
            v-if="getMission(n, iMissionSet)"
            v-bind="{ ...getMission(n,iMissionSet) }"
            outlined
            @click="setSelected(n, iMissionSet)"
          ></d-mission-card>
          <d-mission-card 
            v-else
            add-mission
            @click="setSelected(n, iMissionSet)"
          ></d-mission-card>
        </div>
      </div>
    </template>
    <div>
      <v-btn color="primary" @click="pruneMissionsTable()">prune</v-btn>
      <v-btn color="primary" @click="uploadData()">upload</v-btn>
    </div>
    <v-dialog
      :model-value="showMissionDialog"
      width="auto"
      @update:model-value="(state) => { if (!state) { clearSelected() } }"
    >
      <d-create-mission-dialog
        v-bind="{ ...selectedMission, timeslot: selectedTimeslot, missionset: selectedMissionSet }"
        @save="(data) => createMission(data)"
        @close="clearSelected()"
      ></d-create-mission-dialog>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMissionsStore } from '../../stores/missions';
interface Props {
  timeslot?: number | null,
  missionset?: number | null,
  fobMissions: Array,
};

const props = withDefaults(defineProps<Props>(), {
  timeslot: null,
  missionset: null,
  fobMissions: () => ([]),
});

const emit = defineEmits(['update:fob-missions'])

const nTimeslots = ref(8);
const nMissionSets = ref(4);

const selectedTimeslot = ref(null);
const selectedMissionSet = ref(null);

const selectedMission = computed(() => {
  return missionBucket.value.find((mission) => mission.timeslot === selectedTimeslot.value && mission.missionset === selectedMissionSet.value);
});

const showMissionDialog = computed(
  () => (!!selectedMissionSet.value || selectedMissionSet.value === 0)
    && (!!selectedTimeslot.value || selectedTimeslot.value === 0)
);

const setSelected = (ts, ms) => {
  selectedTimeslot.value = ts;
  selectedMissionSet.value = ms;
}

const clearSelected = () => {
  setSelected(null, null);
}

const missionBucket = ref([]);
const createMission = (missionData) => {
  if (!showMissionDialog) return;
  const existingMissionIndex = missionBucket.value
    .findIndex((mission) => (mission.timeslot === selectedTimeslot.value)
       && (mission.missionset === selectedMissionSet.value));
  if (existingMissionIndex >= 0) {
    missionBucket.value = missionBucket.value.toSpliced(
      existingMissionIndex,
      1,
      {
        ...missionData,
        timeslot: selectedTimeslot.value,
        missionset: selectedMissionSet.value,
      }
    );
  } else {
    missionBucket.value.push({
      ...missionData,
      timeslot: selectedTimeslot.value,
      missionset: selectedMissionSet.value,
    });
  }
  clearSelected();
};
const getMission = (timeslot, missionset) => {
  return missionBucket.value.find((item) => item.timeslot === timeslot && item.missionset === missionset);
};

function removeTimeslot(nTimeslot) {
  // Lower number of timeslots
  nTimeslots.value = Math.max(1, nTimeslots.value - 1);

  // Remove missions in that timeslot
  missionBucket.value = missionBucket.value.filter((mission) => mission.timeslot !== nTimeslot);

  // Modify missions in bucket that fell after timeslot
  missionBucket.value = missionBucket.value.map((mission) => {
    if (mission.timeslot > nTimeslot) {
      return {
        ...mission,
        timeslot: mission.timeslot - 1,
      };
    }
    return mission;
  });
};

function addTimeslotAfter(nTimeslot) {
  // Increment number of timeslots
  nTimeslots.value = Math.min(20, nTimeslots.value + 1);

  // Modify missions in bucket that fell after timeslot
  missionBucket.value = missionBucket.value.map((mission) => {
    if (mission.timeslot > nTimeslot) {
      return {
        ...mission,
        timeslot: mission.timeslot + 1,
      };
    }
    return mission;
  });
};

function addTimeslotBefore(nTimeslot) {
  addTimeslotAfter(nTimeslot - 1);
};

function duplicateTimeslot(nTimeslot) {
  addTimeslotAfter(nTimeslot);

  // Duplicate missions in that timeslot to timeslot after this
  const missionsToDuplicate = missionBucket.value.filter((mission) => mission.timeslot === nTimeslot);
  missionsToDuplicate.forEach(mission => {
    missionBucket.value.push({
      ...mission,
      timeslot: nTimeslot + 1,
    });
  });
};

function pruneTimeslots() {
  [...Array(nTimeslots.value).keys()].toReversed().forEach((iTimeslot) => {
    const missionsInTimeslot = missionBucket.value.filter((mission) => mission.timeslot === iTimeslot);
    if (missionsInTimeslot.length === 0) {
      removeTimeslot(iTimeslot);
    }
  })
};

function removeMissionSet(nMissionSet) {
  // Lower number of timeslots
  nMissionSets.value = Math.max(1, nMissionSets.value - 1);

  // Remove missions in that timeslot
  missionBucket.value = missionBucket.value.filter((mission) => mission.missionset !== nMissionSet);

  // Modify missions in bucket that fell after timeslot
  missionBucket.value = missionBucket.value.map((mission) => {
    if (mission.missionset > nMissionSet) {
      return {
        ...mission,
        missionset: mission.missionset - 1,
      };
    }
    return mission;
  });
};

function addMissionSetAfter(nMissionSet) {
  // Increment number of timeslots
  nMissionSets.value = Math.min(20, nMissionSets.value + 1);

  // Modify missions in bucket that fell after timeslot
  missionBucket.value = missionBucket.value.map((mission) => {
    if (mission.missionset > nMissionSet) {
      return {
        ...mission,
        missionset: mission.missionset + 1,
      };
    }
    return mission;
  });
};

function addMissionSetBefore(nMissionSet) {
  addMissionSetAfter(nMissionSet - 1);
};

function duplicateMissionSet(nMissionSet) {
  addMissionSetAfter(nMissionSet);

  // Duplicate missions in that timeslot to timeslot after this
  const missionsToDuplicate = missionBucket.value.filter((mission) => mission.missionset === nMissionSet);
  console.log(missionsToDuplicate);
  missionsToDuplicate.forEach(mission => {
    missionBucket.value.push({
      ...mission,
      missionset: nMissionSet + 1,
    });
  });
};

function pruneMissionSets() {
  [...Array(nMissionSets.value).keys()].toReversed().forEach((iMissionSet) => {
    const missionsInMissionSet = missionBucket.value.filter((mission) => mission.missionset === iMissionSet);
    if (missionsInMissionSet.length === 0) {
      removeMissionSet(iMissionSet);
    }
  })
};

function pruneMissionsTable() {
  pruneTimeslots();
  pruneMissionSets();
};

const columnActions = [
  {
    title: 'Verwijder tijdslot',
    disabled: nTimeslots.value <= 1,
    action: removeTimeslot,
  },
  {
    title: 'Dupliceer tijdslot',
    action: duplicateTimeslot,
  },
  {
    title: 'Nieuw tijdslot toevoegen voor',
    action: addTimeslotBefore,
  },
  {
    title: 'Nieuw tijdslot toevoegen na',
    action: addTimeslotAfter,
  },
];

const rowActions = [
  {
    title: 'Verwijder missieset',
    disabled: nMissionSets.value <= 1,
    action: removeMissionSet,
  },
  {
    title: 'Dupliceer missieset',
    action: duplicateMissionSet,
  },
  {
    title: 'Nieuw missieset toevoegen voor',
    action: addMissionSetBefore,
  },
  {
    title: 'Nieuw missieset toevoegen na',
    action: addMissionSetAfter,
  },
];

watch(missionBucket, (nValue, oValue) => {
  emit('update:fob-missions', nValue);
  console.log('emitted', nValue)
}, { deep: true });

watch(props.fobMissions, (nValue, oValue) => {
  missionBucket.value = toRaw(nValue);
}, { deep: true });

const missionsPinia = useMissionsStore();

function uploadData() {
  missionBucket.value.forEach((mission) => {
    missionsPinia.addData({
      ...mission,
      id: crypto.randomUUID(),
    });
  })
};

const log = (a) => console.log(a);
</script>

<style scoped>
.missionset-container {
  display: grid;
  grid-template-rows: 100px repeat(var(--n-missionsets), 160px);
  grid-template-columns: 200px repeat(var(--n-timeslots), 184px);
}

.item {
  border-bottom: 1px solid #000
}

.colored-column {
  background-color: #f0f0f0;
}
</style>
