<template>
  <v-card
    flat
    width="320"
    class="px-4"
    :class="{
      'force-select': !aircraft,
      'double-error': props.error,
      'airplane-selector': aircraft && !props.error,
    }"
  >
    <template #text v-if="aircraft">
      <div class="d-flex-column gapped">
        <div class="d-flex-row ga-2 align-center">
          <div class="airplane-avatar">
            <v-img height="40" :src="aircraft.image"></v-img>
          </div>
          <div class="d-flex-column">
            <span
              v-if="!props.error"
              class="text-primary text-body-2 font-weight-medium"
            >
              Gekozen kist
            </span>
            <span v-else class="text-error text-body-2 font-weight-medium">
              Dubbel gekozen
            </span>
            <span class="text-body-1 font-weight-medium">
              {{ aircraft.name }}
            </span>
            <span class="text-body-1 font-weight-medium">
              {{ aircraft.tail }}
            </span>
          </div>
        </div>
        <div class="d-flex-row gapped align-center">
          <v-btn
            color="primary"
            prepend-icon="mdi-swap-horizontal"
            variant="outlined"
            @click="$emit('edit', props.fobToAircraftId)"
          >
            Wissel kist
          </v-btn>
          <span
            class="text-decoration-underline link-text"
            @click="$emit('remove', props.fobToAircraftId)"
          >
            Annuleer kist
          </span>
        </div>
      </div>
    </template>
    <template #text v-else>
      <div class="d-flex-column gapped">
        <div class="d-flex-row ga-2 align-center">
          <div class="airplane-avatar">
            <v-img
              height="40"
              :src="AH64image"
              class="airplane-avatar__hidden"
            ></v-img>
          </div>
          <div class="d-flex-column">
            <span class="text-primary text-body-2 font-weight-medium">
              [Maak een keuze]
            </span>
            <span>---</span>
            <span>---</span>
          </div>
        </div>
        <div class="d-flex-row gapped align-center">
          <v-btn
            color="primary"
            block
            @click="$emit('edit', null)"
          >
            Kies een kist
          </v-btn>
        </div>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import AH64image from '../../assets/systems/AH64.svg';
  
import { useTailsStore } from '../../stores/tails';
const tailsPinia = useTailsStore();

interface Props {
  aircraftId?: string | null,
  fobToAircraftId?: string | null,
  error?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  aircraftId: null,
  fobToAircraftId: null,
  error: false,
});

const emit = defineEmits(['edit']);

const aircraft = computed(() => {
  if (!props.aircraftId) return null;
  return tailsPinia.getById(props.aircraftId);
});
</script>


<style scoped>
.airplane-avatar {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
}
.airplane-avatar__hidden {
  opacity: 0.38
}
.airplane-selector {
  background-color: #F4F4F4;
}
.force-select {
  background-color: #E5ECF7;
  border: 1px #154273 dashed; 
}
.double-error {
  background-color: #C00A0D0F;
}
.link-text {
  cursor: pointer;
}
</style>
