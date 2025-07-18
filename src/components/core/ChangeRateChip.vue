<template>
  <v-chip :color="color" label :prepend-icon="icon" variant="tonal" class="px-4">
    <span v-if="invalidValue">---</span>
    <span v-else>{{ props.value }}%</span>
  </v-chip>
</template>

<script setup lang="ts">
interface Props {
  value: number | null,
};

const props = withDefaults(defineProps<Props>(), {
  value: null,
});

const invalidValue = computed(() => {
  return props.value === null || props.value === undefined;
})

const color = computed(() => {
  if (invalidValue.value) {
    return '#000';
  }
  if (props.value >= 0 && props.value <= 15) {
    return 'success'
  }
  if (props.value > 15 && props.value <= 30) {
    return 'warning'
  }
  if (props.value > 30) {
    return 'error'
  }
})

const icon = computed(() => {
  if (invalidValue.value) {
    return 'mdi-border-none-variant';
  }
  if (props.value >= 0 && props.value <= 15) {
    return 'mdi-shield-airplane'
  }
  if (props.value > 15 && props.value <= 30) {
    return 'mdi-airplane-alert'
  }
  if (props.value > 30) {
    return 'mdi-alert'
  }
})
</script>

<style lang="scss" scoped>
:deep(.v-chip__content),
:deep(.v-chip__prepend) {
  color: #000;
}
</style>
