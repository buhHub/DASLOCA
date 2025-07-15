<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col :cols="a">
        <d-change-rate-chip :value="3"></d-change-rate-chip>
        <d-change-rate-chip :value="16"></d-change-rate-chip>
        <d-change-rate-chip :value="35"></d-change-rate-chip>
      </v-col>
      <v-col :cols="a">
        <d-mission-card title="Missie: A" difficulty="EASY" :wear="1"></d-mission-card>
        <d-mission-card title="Missie: A" difficulty="MEDIUM" :wear="20"></d-mission-card>
        <d-mission-card title="Missie: A" difficulty="HARD" :wear="40"></d-mission-card>
      </v-col>
      <v-col :cols="a">
        <d-weapon-selector></d-weapon-selector>
        <d-weapon-selector tail="D-472"></d-weapon-selector>
        <d-weapon-selector tail="D-472" error></d-weapon-selector>
      </v-col>
      <v-col :cols="a">
        <d-weapon-selector-option></d-weapon-selector-option>
        <d-weapon-selector-option tail="Q-39"></d-weapon-selector-option>
        <d-weapon-selector-option tail="Q-39" disabled></d-weapon-selector-option>
      </v-col>
      <v-col :cols="a" offset="4">
        <d-create-mission-dialog></d-create-mission-dialog>
        <d-create-mission-dialog :timeslot="3" :missionset="2"></d-create-mission-dialog>
      </v-col>
      <v-col :cols="a">
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const a = 2;
</script>
