import { createRouter, createWebHashHistory } from 'vue-router'

import About from '../components/about/About.vue'
import Acknowledgements from '../components/acknowledgements/Acknowledgements.vue'
import Locations from '../components/locations/Locations.vue'
import Magic from '../components/magic/Magic.vue'
import Materials from '../components/materials/Materials.vue'
import Npcs from '../components/npcs/Npcs.vue'
import Objects from '../components/objects/Objects.vue'
import Quests from '../components/quests/Quests.vue'
import Shops from '../components/shops/Shops.vue'
import NotFound from '../components/notfound/NotFound.vue'

const routes = [
  { path: '/', component: Objects },
  { path: '/objects', component: Objects },
  { path: '/locations', component: Locations },
  { path: '/magic', component: Magic },
  { path: '/shops', component: Shops },
  { path: '/npcs', component: Npcs },
  { path: '/quests', component: Quests },
  { path: '/materials', component: Materials },
  { path: '/about', component: About },
  { path: '/acknowledgements', component: Acknowledgements },

  { path: '/:pathMatch(.*)*', component: NotFound }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})