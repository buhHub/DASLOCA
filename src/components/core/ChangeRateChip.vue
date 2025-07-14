<template>
  <v-chip :color="color" label :prepend-icon="icon" class="px-4">
    <span v-if="value">{{ value }}%</span>
    <span v-else>---</span>
  </v-chip>
</template>

<script setup lang="ts">
interface Props {
  value: number | null,
};

const props = withDefaults(defineProps<Props>(), {
  value: null,
})

const color = computed(() => {
  if (!props.value) {
    return '#000';
  }
  if (props.value > 0 && props.value <= 15) {
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
  if (!props.value) {
    return 'mdi-border-none-variant';
  }
  if (props.value > 0 && props.value <= 15) {
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
