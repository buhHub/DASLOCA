<template>
  <v-card
    v-if="aircraft"
    flat
    width="320"
    class="airplane-selector-option"
    :class="{ 'airplane-selector-option__disabled': props.disabled }"
  >
    <template #text>
      <div class="d-flex-column gapped align-center">
        <div class="d-flex-row ga-2 align-center">
          <div class="airplane-avatar">
            <v-img
              height="40"
              :src="aircraft.image"
            ></v-img>
          </div>
          <div class="d-flex-column pr-8">
            <span class="text-body-1 font-weight-medium">
              {{ aircraft.name }}
            </span>
            <span class="text-body-1 font-weight-medium">
              {{ aircraft.tail }}
            </span>
          </div>
        </div>
        <div class="d-flex-column ga-2 align-center">
          <span class="text-body-1 font-weight-medium">
            Verwachte change-rate
          </span>
          <div class="d-flex-row ga-4 align-center justify-center">
            <d-change-rate-chip :value="aircraft.wear"></d-change-rate-chip>
            <v-icon>mdi-chevron-right</v-icon>
            <d-change-rate-chip :value="props.expectedWear"></d-change-rate-chip>
          </div>
        </div>
        <v-btn
          v-if="props.disabled"
          color="grey-darken-3"
          block
          disabled
        >
          Geselecteerd
        </v-btn>
        <v-btn
          v-else
          color="primary"
          block
          @click="$emit('select', tail)"
        >
          Selecteer deze kist
        </v-btn>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import AH64image from '../../assets/systems/AH64.svg';
import AS532image from '../../assets/systems/AS532.svg';
import CH47image from '../../assets/systems/CH47.svg';
import { useTailsStore } from '../../stores/tails';
const tailsPinia = useTailsStore();

interface Props {
  tail: string | null,
  disabled: boolean,
  expectedWear: number | null,
};

const props = withDefaults(defineProps<Props>(), {
  tail: null,
  disabled: false,
  expectedWear: null,
});

const emit = defineEmits(['select']);

const aircraft = computed(() => {
  if (!props.tail) return null;
  return tailsPinia.getByTail(props.tail);
});
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
