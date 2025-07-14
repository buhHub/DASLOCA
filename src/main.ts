/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import { AppBar, ChangeRateChip, MissionCard, WeaponSelector } from './components/core'

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

registerPlugins(app)

app.mount('#app')
