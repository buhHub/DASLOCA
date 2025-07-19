<template>
  <v-card width="640" class="align-self-center">
    <v-card-item>
      <div class="d-flex-row justify-space-between">
        <div>
          <v-card-title>
            Kist toevoegen
          </v-card-title>
        </div>
        <v-btn variant="flat" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card-item>
    <v-card-text>
      <div class="d-flex-column gapped">
        <v-card color="#F4F4F4" flat class="d-flex-column pa-4 select-type-card">
          <span classs="text-caption">Selecteer type</span>
          <div class="d-flex-row mt-4">
            <div
              v-for="(type, index) in systems"
              class="d-flex-column ga-2 align-center clickable"
              @click="aircraftType = parseInt(index)"
            >
              <div
                class="airplane-avatar"
                :class="{ 'airplane-avatar__selected': parseInt(index) === aircraftType }"
              >
                <v-img
                  height="40"
                  :src="type.image"
                ></v-img>
              </div>
              <div
                class="px-4"
                :class="{
                  'text-grey-darken-1': parseInt(index) !== aircraftType,
                  'font-weight-bold': parseInt(index) === aircraftType,
                }"
              >
                {{ type.name }}
              </div>
            </div>
          </div>
        </v-card>
        <v-text-field
          v-model="aircraftTail"
          label="Tail"
          placeholder="D-xxx"
          persistent-placeholder
          hide-details
          clearable
          autofocus
        ></v-text-field>
        <v-number-input
          v-model="aircraftWear"
          label="Beginstand change-rate"
          placeholder="Ingress"
          persistent-placeholder
          hide-details
          clearable
        ></v-number-input>
        <div class="d-flex-row justify-space-between">
          <v-btn color="grey-darken-3" variant="outlined" @click="$emit('close')">
            Annuleren
          </v-btn>
          <v-btn 
            color="primary"
            :disabled="!aircraftTail || aircraftWear === null || !aircraftType || aircraftWear === undefined"
            @click="emitForm()">
            Kist opslaan en sluiten
          </v-btn>
        </div>
        <span
          v-if="props.id"
          class="text-caption text-decoration-underline clickable"
          @click="$emit('remove', props.id)"
        >
          Verwijder kist
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { systems } from '../../consts/weapons';

interface Props {
  id?: string | null,
  tail?: string | null,
  wear?: number | null,
  type?: number | null,
};

const props = withDefaults(defineProps<Props>(), {
  id: null,
  tail: null,
  wear: 0,
  type: null,
});

const emit = defineEmits(['close', 'save', 'remove'])

const showDialog = computed(() => {
  return (!!props.timeslot || props.timeslot === 0)
    && (!!props.missionset || props.missionset === 0);
});

const aircraftTail = ref(props.tail);
const aircraftWear = ref(props.wear);
const aircraftType = ref(props.type);

function emitForm() {
  const formData = {
    tail: aircraftTail.value,
    wear: aircraftWear.value,
    type: aircraftType.value,
    id: props.id,
  };
  emit('save', formData);
};
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
.airplane-avatar__selected {
  border: 1px solid black;
}

.airplane-avatar__hidden {
  opacity: 0.38
}

.airplane-selector-option {
  border: 1px #B8B8B8 solid;
}

.airplane-selector-option__disabled {
  background-color: #EBEBEB;
  border: none !important;
}

.select-type-card {
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid #ababab;
}
</style>
