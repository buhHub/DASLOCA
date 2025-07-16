<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>
    <div class="d-flex-column mx-8 my-8 ga-8 fill-width">

      <!-- Header -->
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">Home</span>
        <span class="text-body-1">Overzicht FOB's</span>
      </div>


      <!-- Content -->
      <v-card flat class="d-flex-column ga-4">

        <!-- Upcoming -->
        <div class="d-flex-column ga-4">
          <span class="text-body-1 font-weight-bold">Komende FOB's</span>
          <v-row>
            <v-col cols="3" v-for="(fob, index) in fobsPinia.getUpcomingFobs" :key="`upcoming-fob-${index}`">
              <d-fob-thumb :fobId="fob.id"></d-fob-thumb>
            </v-col>
          </v-row>
        </div>

        <!-- Active -->
        <div class="d-flex-column ga-4">
          <span class="text-body-1 font-weight-bold">Actieve FOB's</span>
          <v-row>
            <v-col cols="3" v-for="(fob, index) in fobsPinia.getActiveFobs" :key="`active-fob-${index}`">
              <d-fob-thumb :fobId="fob.id" active></d-fob-thumb>
            </v-col>
          </v-row>
        </div>
      </v-card>


    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFobsStore } from '../stores/fobs';
  const fobsPinia = useFobsStore();
</script>
