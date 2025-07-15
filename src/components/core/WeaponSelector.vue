<template>
  <v-card
    flat
    width="320"
    class="px-4"
    :class="{
      'force-select': !isTail,
      'double-error': props.error,
      'airplane-selector': isTail && !props.error,
    }"
  >
    <template #text v-if="isTail">
      <div class="d-flex-column gapped">
        <div class="d-flex-row ga-2 align-center">
          <div class="airplane-avatar">
            <v-img height="40" :src="getSystemByTail(tail).image"></v-img>
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
              {{ getSystemByTail(tail)?.name }}
            </span>
            <span class="text-body-1 font-weight-medium">
              {{ tail }}
            </span>
          </div>
        </div>
        <div class="d-flex-row gapped align-center">
          <v-btn
            color="primary"
            prepend-icon="mdi-swap-horizontal"
            variant="outlined"
          >
            Wissel kist
          </v-btn>
          <span class="text-decoration-underline">Annuleer kist</span>
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
import AS532image from '../../assets/systems/AS532.svg';
import CH47image from '../../assets/systems/CH47.svg';

interface Props {
  tail: string | null,
  error: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  tail: null,
  error: false,
});

const difficultyIcon = {
  EASY: 'mdi-circle-outline',
  MEDIUM: 'mdi-circle-slice-4',
  HARD: 'mdi-circle-slice-8',
}

const getSystemByTail = (tailId) => {
  if (!isTail) return {};
  return systems[tails[tailId]];
}

const systems = {
  1: {
    name: 'Chinook CH-47',
    image: CH47image,
  },
  2: {
    name: 'Apache AH-64',
    image: AH64image,
  },
  3: {
    name: 'Cougar AS-532',
    image: AS532image,
  },
}

const tails = {
  'D-472': 1,
  'D-473': 1,
  'D-479': 1,
  'D-480': 1,
  'D-481': 1,
  'D-482': 1,
  'D-483': 1,
  'D-484': 1,
  'D-485': 1,
  'D-601': 1,
  'D-602': 1,
  'D-603': 1,
  'D-604': 1,
  'D-605': 1,
  'D-606': 1,
  'S-419': 2,
  'S-440': 2,
  'S-441': 2,
  'S-442': 2,
  'S-444': 2,
  'S-445': 2,
  'S-447': 2,
  'S-450': 2,
  'S-453': 2,
  'S-454': 2,
  'S-454': 2,
  'S-455': 2,
  'S-456': 2,
  'S-457': 2,
  'S-458': 2,
  'S-459': 2,
  'Q-37': 3,
  'Q-38': 3,
  'Q-39': 3,
  'Q-40': 3,
  'Q-41': 3,
  'Q-42': 3,
  'Q-43': 3,
  'Q-44': 3,
  'Q-45': 3,
  'Q-46': 3,
  'Q-47': 3,
  'Q-48': 3,
}

const isTail = computed(() => !!tails[props.tail])

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
</style>
