<template>
  <v-container class="fill-height" fluid>
    <div class="d-flex-column ga-2">
      <div class="d-flex-row ga-2">
        <d-aircraft-selector-dialog v-model="dialog"></d-aircraft-selector-dialog>
      </div>
      <div class="d-flex-row ga-2">
        <d-aircraft-selector-dialog v-model="dialog"></d-aircraft-selector-dialog>
      </div>
      <div class="d-flex-row ga-2">
        <d-change-rate-chip></d-change-rate-chip>
        <d-change-rate-chip :value="3"></d-change-rate-chip>
        <d-change-rate-chip :value="16"></d-change-rate-chip>
        <d-change-rate-chip :value="35"></d-change-rate-chip>
      </div>
      <div class="d-flex-row ga-2">
        <d-fob-thumb fobId="7a98db42-3a89-425d-8984-632196a94bcc"></d-fob-thumb>
        <!-- <d-create-mission-dialog></d-create-mission-dialog>
        <d-create-mission-dialog :timeslot="3" :missionset="2"></d-create-mission-dialog> -->
      </div>
      <div class="d-flex-row ga-2">
        <d-mission-card title="Geen missie" show-wear></d-mission-card>
        <d-mission-card title="Missie: A" difficulty="EASY" :wear="1"></d-mission-card>
        <d-mission-card title="Missie: A" difficulty="MEDIUM" :wear="20"></d-mission-card>
        <d-mission-card title="Missie: A" difficulty="HARD" :wear="40"></d-mission-card>
        <d-mission-card add-mission></d-mission-card>
        <d-mission-card outlined title="Missie: A" difficulty="MEDIUM"></d-mission-card>
        <d-mission-card outlined title="Missie: A" difficulty="HARD"></d-mission-card>
      </div>
      <div class="d-flex-row ga-2">
        <d-weapon-selector></d-weapon-selector>
        <d-weapon-selector aircraft-id="t-ab"></d-weapon-selector>
        <d-weapon-selector aircraft-id="t-ab" error></d-weapon-selector>
      </div>
      <div class="d-flex-row ga-2">
        <d-aircraft-selector-card></d-aircraft-selector-card>
        <d-aircraft-selector-card tail="Q-39"></d-aircraft-selector-card>
        <d-aircraft-selector-card tail="Q-39" disabled></d-aircraft-selector-card>
      </div>
      <div class="d-flex-row ga-2">
        <d-create-fob-missions></d-create-fob-missions>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const a = 2;
const dialog = ref(false);
</script>
