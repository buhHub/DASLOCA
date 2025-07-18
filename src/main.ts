/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import {
  AppBar,
  ChangeRateChip,
  CreateFOBMissions,
  CreateMissionDialog,
  FobThumb,
  MissionCard,
  SideBar,
  WeaponSelector,
  AircraftSelectorCard,
  AircraftSelectorDialog,
  GraphComponentMiniCard,
} from './components/core'

// Icons
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

app.component('d-app-bar', AppBar);
app.component('d-change-rate-chip', ChangeRateChip);
app.component('d-mission-card', MissionCard);
app.component('d-weapon-selector', WeaponSelector);
app.component('d-aircraft-selector-card', AircraftSelectorCard);
app.component('d-aircraft-selector-dialog', AircraftSelectorDialog);
app.component('d-create-mission-dialog', CreateMissionDialog);
app.component('d-create-fob-missions', CreateFOBMissions);
app.component('d-side-bar', SideBar);
app.component('d-fob-thumb', FobThumb);
app.component('d-graph-component-mini-card', GraphComponentMiniCard);

registerPlugins(app)

app.mount('#app')