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
  CreateMissionDialog,
  MissionCard,
  WeaponSelector,
  WeaponSelectorOption,
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
app.component('d-weapon-selector-option', WeaponSelectorOption);
app.component('d-create-mission-dialog', CreateMissionDialog);

registerPlugins(app)

app.mount('#app')
