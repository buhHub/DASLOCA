<template>
  <v-card v-if="props.addMission" color="primary" flat width="160" max-width="160" class="fill-height">
    <template #title>
      <div class="d-flex-row ga-2">
        <v-icon size="24" color="white">mdi-plus</v-icon>
        <div class="d-flex-column allow-text-wrapping text-body-1 font-weight-bold">
          Missie toevoegen
        </div>
      </div>
    </template>
  </v-card>
  <v-card v-else color="#F4F4F4" flat width="160" max-width="160" :class="{ 'card__outlined': props.outlined }" class="fill-height">
    <template #title>
      <div class="d-flex-column justify-space-between fill-height">
        <div class="d-flex-column allow-text-wrapping">
          <div v-if="props.wear || props.showWear" class="chip-wrapper">
            <d-change-rate-chip :value="wear"></d-change-rate-chip>
          </div>
          <template v-if="!props.title">
            <span v-if="props.showWear">Geen missie</span>
            <span v-else>Geef een missienaam</span>
          </template>
          <span v-else>{{ props.title }}</span>
          <span v-if="props.subtitle" class="text-body-1 font-weight-bold">{{ props.subtitle }}</span>
          <div v-if="props.difficulty" class="d-flex-row align-center ga-1 text-body-2">
            {{ props.difficulty }}
            <v-icon size="14" :color="difficultyIconColor[props.difficulty]">
              {{ difficultyIcon[props.difficulty] }}
            </v-icon>
          </div>
        </div>
        <div v-if="props.outlined" class="d-flex-row ga-1 align-center justify-end">
          <v-icon size="12">mdi-pencil</v-icon>
          <span class="text-caption text-decoration-underline">Bewerk</span>
        </div>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string | null,
  subtitle?: string | null,
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | null,
  wear?: number | null,
  showWear?: boolean,
  addMission?: boolean,
  outlined?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  title: null,
  subtitle: null,
  difficulty: null,
  wear: null,
  showWear: false,
  addMission: false,
  outlined: false,
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

<style lang="scss" scoped>
.chip-wrapper{
  display: inline-flex;
}
.allow-text-wrapping {
  text-wrap: auto;
}
.card__outlined {
  background-color: white !important;
  border: 1px solid #CCC;
}
:deep(.v-card-item), :deep(.v-card-item__content), :deep(.v-card-title) {
  height: 100%;
}
</style>
