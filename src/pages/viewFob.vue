<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>
    <!-- <HelloWorld/> -->

    <div class="d-flex-column">

      <!-- Header -->
      <div class="d-flex-column ma-8">
        <span class="text-h4 font-weight-bold">Geplande FOB</span>
        <span class="text-h5 font-weight-bold">fob.name</span>
        <span class="text-body-1">fob.startdaum</span>
      </div>

      <!-- Missionsets -->
      <div class="d-flex-column ga-2 ma-8">

        <!-- Missionset header -->
        <div class="d-flex-row align-end ga-2">
          <span class="text-body-1 font-weight-bold">Missieset #{{ 1 }}</span>
          <span class="text-caption text-decoration-underline">Toon details</span>
        </div>

        <!-- Missionset row -->
        <div class="d-flex-row ga-2">
          <d-weapon-selector></d-weapon-selector>
          <d-mission-card title="Missie: A" difficulty="EASY" show-wear></d-mission-card>
          <d-mission-card title="Missie: A" difficulty="MEDIUM" show-wear></d-mission-card>
          <d-mission-card title="Missie: A" difficulty="HARD" show-wear></d-mission-card>
          <d-mission-card title="Missie: A" difficulty="HARD" show-wear></d-mission-card>
        </div>

        <!-- Missionset add extra airplane -->
        <div class="d-flex-row ga-2">
          <v-btn variant="outlined" size="small" color="primary">Kist toevoegen</v-btn>
        </div>
        <v-divider></v-divider>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>
  //
</script>
