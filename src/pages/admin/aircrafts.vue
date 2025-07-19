<template>
  <div class="d-flex-row fill-height">
    <d-side-bar></d-side-bar>

    <v-dialog v-model="showCreateAircraftDialog">
      <d-create-aircraft-dialog
        :type="selectedAircraft?.type ?? aircraftTab + 1"
        :wear="selectedAircraft?.wear"
        :tail="selectedAircraft?.tail"
        :id="selectedAircraft?.id"
        @close="closeAircraftDialog()"
        @save="saveAircraft($event)"
        @remove="deleteAircraft($event)"
      ></d-create-aircraft-dialog>
    </v-dialog>

    <div class="d-flex-column mx-8 my-8 ga-8 fill-width">

      <!-- Header -->
      <div class="d-flex-column">
        <span class="text-h4 font-weight-bold">Kisten beheren</span>
        <span class="text-body-1">Overzicht FOB's</span>
      </div>


      <!-- Content -->
      <div>
        <v-tabs
          v-model="aircraftTab"
        >
          <v-tab
            v-for="(aircraftName, index) in Object.keys(aircraftCounter)"
            :value="index"
            color="primary"
            mandatory
          >
            {{ aircraftName }} ({{ aircraftCounter[aircraftName] }})
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
      </div>
      <div>
        <v-tabs-window v-model="aircraftTab">
          <v-tabs-window-item
            v-for="(aircraftName, index) in Object.keys(aircraftCounter)"
            :value="index"
          >
            <v-row>
              <v-col cols="3">
                <v-card
                  flat
                  color="#F4F4F4"
                  class="d-flex-column pa-4 justify-center align-center fill-height add-aircraft-card"
                  @click="openAircraftDialog(null)"
                >
                  <div class="d-flex-row ga-4 text-body-1 font-weight-bold text-primary">
                    <v-icon>mdi-plus</v-icon>
                    Kist toevoegen
                  </div>
                </v-card flat>
              </v-col>
              <v-col
                v-for="(aircraft, aIndex) in tailsByAircraftType(aircraftName)"
                cols="3"
              >
                <v-card
                  flat
                  color="#F4F4F4"
                  class="d-flex-column pa-4 align-center"
                >
                  <div class="d-flex-column ga-4">
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
                    <v-btn
                      block
                      variant="outlined"
                      color="primary"
                      prepend-icon="mdi-pencil"
                      @click="openAircraftDialog(aircraft)"
                    >
                      Bewerken
                    </v-btn>
                  </div>
                </v-card flat>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFobsStore } from '../../stores/fobs';
  import { useTailsStore } from '../../stores/tails';

  const fobsPinia = useFobsStore();
  const tailsPinia = useTailsStore();

const aircraftTab = ref();

const aircraftCounter = computed(() => {
  const allAircrafts = tailsPinia.getAll;
  return allAircrafts.reduce((acc, sample) => ({
    ...acc,
    [sample.name]: (acc[sample.name] ?? 0) + 1,
  }), {})
});

function tailsByAircraftType(typeName) {
  return tailsPinia.getAll.filter((tail) => tail.name === typeName);
};

const showCreateAircraftDialog = ref(false);
const selectedAircraft = ref(null);
function openAircraftDialog(data) {
  selectedAircraft.value = data;
  showCreateAircraftDialog.value = true;
};
function closeAircraftDialog() {
  selectedAircraft.value = null;
  showCreateAircraftDialog.value = false;
};
function saveAircraft(aircraftData) {
  if (!aircraftData.id) {
    tailsPinia.addData(aircraftData);
  } else {
    tailsPinia.modifyData(aircraftData);
  }
  closeAircraftDialog();
};
function deleteAircraft(aircraftId) {
  tailsPinia.removeData(aircraftId);
  closeAircraftDialog();
}

</script>

<style scoped>
.airplane-avatar {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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
.add-aircraft-card {
  border: 1px solid #154273;
}
</style>

