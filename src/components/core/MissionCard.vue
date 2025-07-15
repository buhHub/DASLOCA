<template>
  <v-card color="#F4F4F4" flat width="128" max-width="128">
    <template #title>
      <div class="d-flex-column">
        <div v-if="!props.hideChip" class="chip-wrapper">
          <d-change-rate-chip :value="wear"></d-change-rate-chip>
        </div>
        <span v-if="!props.title">Geen missie</span>
        <template v-else>
          <span>{{ props.title }}</span>
          <div class="d-flex-row align-center ga-1 text-body-2">
            {{ props.difficulty }}
            <v-icon size="14" :color="difficultyIconColor[props.difficulty]">
              {{ difficultyIcon[props.difficulty] }}
            </v-icon>
          </div>
        </template>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string | null,
  difficulty: 'EASY' | 'MEDIUM' | 'HARD',
  wear: number | null,
  hideChip: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  title: null,
  difficulty: 'EASY',
  wear: null,
  hideChip: false,
});

const difficultyIcon = {
  EASY: 'mdi-circle-outline',
  MEDIUM: 'mdi-circle-slice-4',
  HARD: 'mdi-circle-slice-8',
}

const difficultyIconColor = {
  EASY: 'success',
  MEDIUM: 'warning',
  HARD: 'error',
}
</script>

<style>
.chip-wrapper{
  display: inline-flex;
}
</style>
