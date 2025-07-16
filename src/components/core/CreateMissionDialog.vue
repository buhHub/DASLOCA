<template>
  <v-card v-if="showDialog" width="840">
    <v-row>
      <v-col cols="9">
        <v-card-item>
          <div class="d-flex-row justify-space-between">
            <div>
              <v-card-title>
                Missie aanmaken
              </v-card-title>
              <v-card-subtitle>
                Tijdslot {{ props.timeslot }} - Missieset {{ props.missionset }}
              </v-card-subtitle>
            </div>
            <v-btn variant="flat" @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-item>
        <v-card-text>
          <div class="d-flex-column gapped">
            <v-text-field v-model="missionName" label="Naam" placeholder="OP Wolf" persistent-placeholder hide-details clearable autofocus></v-text-field>
            <v-text-field v-model="missionDescription" label="Beschrijving" placeholder="Ingress" persistent-placeholder hide-details
              clearable></v-text-field>
            <v-btn-toggle v-model="missionDifficulty" variant="outlined" divided mandatory class="d-flex-row">
              <v-btn class="flex-grow-1" value="EASY">
                <v-icon class="mr-2" icon="mdi-circle-outline" color="success"></v-icon>
                Easy
              </v-btn>
              <v-btn class="flex-grow-1" value="MEDIUM">
                <v-icon class="mr-2" icon="mdi-circle-slice-4" color="warning"></v-icon>
                Medium
              </v-btn>
              <v-btn class="flex-grow-1" value="HARD">
                <v-icon class="mr-2" icon="mdi-circle-slice-8" color="error"></v-icon>
                Hard
              </v-btn>
            </v-btn-toggle>
            <div class="d-flex-row justify-space-between">
              <v-btn color="grey-darken-3" variant="outlined" @click="$emit('close')">
                Annuleren
              </v-btn>
              <v-btn color="primary" :disabled="!missionName || !missionDifficulty" @click="emitForm()">
                Missie opslaan
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3">
        <div class="d-flex-column justify-center fill-height">
          <v-card-title>
            Preview
          </v-card-title>
          <v-card-text class="flex-grow-0">
            <d-mission-card
              :title="missionName"
              :subtitle="missionDescription"
              :difficulty="missionDifficulty"
              hide-chip
            ></d-mission-card>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  timeslot: number | null,
  missionset: number | null,
};

const props = withDefaults(defineProps<Props>(), {
  timeslot: null,
  missionset: null,
});

const emit = defineEmits(['close', 'save'])

const showDialog = computed(() => {
  return (!!props.timeslot || props.timeslot === 0)
    && (!!props.missionset || props.missionset === 0);
});

const missionName = ref('');
const missionDescription = ref('');
const missionDifficulty = ref('');

const emitForm = () => {
  const formData = {
    title: missionName.value,
    subtitle: missionDescription.value,
    difficulty: missionDifficulty.value,
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
  background-color: transparent;
  border-radius: 50%;
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
</style>
