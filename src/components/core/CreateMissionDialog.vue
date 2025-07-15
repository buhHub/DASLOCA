<template>
  <v-card v-if="showDialog" width="800">
    <v-row>
      <v-col cols="9">
        <v-card-title>Missie aanmaken</v-card-title>
        <v-card-subtitle>
          Tijdslot {{ props.timeslot }} - Msisieset {{ props.missionset }}
        </v-card-subtitle>
        <v-card-text>
          <div class="d-flex-column gapped">
            <v-text-field v-model="missionName" label="Naam" placeholder="OP Wolf" persistent-placeholder hide-details clearable></v-text-field>
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
              <v-btn color="grey-darken-3" variant="outlined">
                Annuleren
              </v-btn>
              <v-btn color="primary">
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
              :description="missionDescription"
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

const showDialog = computed(() => {
  return !!props.timeslot && !!props.missionset;
});

const missionName = ref('');
const missionDescription = ref('');
const missionDifficulty = ref('');
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
