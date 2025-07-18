<template>
  <v-dialog v-model="model">
    <v-card width="1400" style="align-self: center;">
      <v-card-item>
        <div class="d-flex-row justify-space-between">
          <div>
            <v-card-title>
              Missie aanmaken
            </v-card-title>
            <v-card-subtitle>
              {{ props.fob.name }} - Missieset {{ props.missionset + 1 }}
            </v-card-subtitle>
          </div>
          <v-btn variant="flat" @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-item>
      <v-card-text>
        <v-tabs
          v-model="aircraftTab"
        >
          <v-tab
            v-for="(aircraftName, index) in Object.keys(aircraftCounter)"
            :value="aircraftName"
            color="primary"
            mandatory
          >
            {{ aircraftName }} ({{ aircraftCounter[aircraftName] }})
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text>
        <v-tabs-window v-model="aircraftTab">
          <v-tabs-window-item
            v-for="(aircraftName, index) in Object.keys(aircraftCounter)"
            :value="aircraftName"
          >
            <v-row>
              <v-col
                v-for="(aircraft, aIndex) in tailsByAircraftType(aircraftName)"
                cols="3"
              >
                <d-aircraft-selector-card
                  :tail="aircraft.tail"
                  :disabled="disableAircraft(aircraft.id)"
                  :expected-wear="Math.max(...calculateChangeRate(
                    props.fob, fobMissionByMs, props.nTimeslots, aircraft,
                  ))"
                  @select="$emit('select', {
                    id: props.selectedId,
                    fobId: props.fob.id,
                    missionset: props.missionset,
                    aircraftId: aircraft.id,
                  })"
                ></d-aircraft-selector-card>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { calculateChangeRate } from '../../consts/helpers';
  import { useTailsStore } from '../../stores/tails';
  import { useMissionsStore } from '../../stores/missions';
  import { useFobToAircraftsStore } from '../../stores/fobToAircrafts';
  const tailsPinia = useTailsStore();
  const missionsPinia = useMissionsStore();
  const fobToAircraftsPinia = useFobToAircraftsStore();

  const model = defineModel()
  interface Props {
    fob: Object;
    missionset?: number | null,
    selectedId?: string | null,
    nTimeslots: number | null,
  };

  const props = withDefaults(defineProps<Props>(), {
    fob: () => ({}),
    missionset: null,
    selectedId: null,
    nTimeslots: null,
  })

  const emit = defineEmits(['select']);

  const aircraftTab = ref();

  const aircraftCounter = computed(() => {
    const allAircrafts = tailsPinia.getAll;
    return allAircrafts.reduce((acc, sample) => ({
      ...acc,
      [sample.name]: (acc[sample.name] ?? 0) + 1,
    }), {})
  });

  function tailsByAircraftType(typeName) {
    return tailsPinia.getAll.filter((tail) => tail.name === typeName);
  };

  function disableAircraft(aircraftId) {
    return fobToAircraftsPinia.getAll
      .filter((unit) => unit.missionset === props.missionset && props.fob.id === unit.fobId)
      .some((unit) => unit.aircraftId === aircraftId);
  };

  const fobMissionByMs = computed(() => {
    return missionsPinia.getMissionsByFobId(props.fob.id)
      .filter((mission) => mission.missionset === props.missionset) ?? [];
  });
</script>

<style lang="scss" scoped>
</style>
