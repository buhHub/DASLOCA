<template>
  <v-card
    flat
    :class="{ 'selected-component': props.selected }"
    class="d-flex-column justify-space-between pa-4 component flex-grow-1"
    @click="$emit('select', props.title)"
  >
    <div class="d-flex-column ga-1">
      <span class="text-body-2 font-weight-medium">
        {{ props.title }}
      </span>
      <div class="d-flex-column">
        <span
          :class="`text-h5 font-weight-bold text-${color(highestWear)}`"
        >
          {{ highestWear }}%
          <v-icon v-if="highestWear > 30" size="18">
            mdi-alert
          </v-icon>
        </span>
        <span class="text-caption mt-n1">{{ subtitle }}</span>
      </div>
      <div class="flex-grow-1">
        <v-sparkline
          v-model="props.wear"
          smooth
          auto-draw
          height="90%"
          :color="color(highestWear)"
        ></v-sparkline>
      </div>
    </div>
    <span class="text-end text-caption text-decoration-underline">
      Toon details
    </span>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string | null,
  wear: Array<number>,
  selected: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  title: null,
  wear: () => ([]),
  selected: false,
})

const emit = defineEmits(['select'])

const highestWear = computed(() => {
  if (props.wear.length === 0) return 0;
  return Math.max(...props.wear);
});

function color(value) {
  if (!value) {
    return '#000';
  }
  if (value >= 0 && value <= 15) {
    return 'success'
  }
  if (value > 15 && value <= 30) {
    return 'warning'
  }
  if (value > 30) {
    return 'error'
  }
};

const subtitle = computed(() => {
  if (highestWear.value >= 0 && highestWear.value <= 15) {
    return 'Goed';
  }
  if (highestWear.value > 15 && highestWear.value <= 30) {
    const start = props.wear.findIndex((w) => w > 15);
    return `Matig v. tijdslot ${start}`;
  }
  if (highestWear.value > 30) {
    const start = props.wear.findIndex((w) => w > 30);
    return `Nood v. tijdslot ${start}`;
  }
});
</script>

<style lang="scss" scoped>
  .component {
   background-color: #FAFAFA;
   border: 1px solid #D9D9D9;
  }
 .selected-component {
  border: 1px solid #6E6E6E !important;
 }
</style>
