import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

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

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/objects' },

  { path: '/objects/:subpage?', name: 'objects', component: Objects, 
    meta: { color: 'red', navDisplayName: 'Objects', topNav: true }  },
  { path: '/locations/:subpage?', name: 'locations', component: Locations,
    meta: { color: 'orange', navDisplayName: 'Locations', topNav: true } },
  { path: '/magic/:subpage?', name: 'magic', component: Magic,
    meta: { color: 'yellow', navDisplayName: 'Magic', topNav: true }  },
  { path: '/shops/:subpage?', name: 'shops', component: Shops,
    meta: { color: 'green', navDisplayName: 'Shops', topNav: true }  },
  { path: '/npcs/:subpage?', name: 'npcs', component: Npcs,
    meta: { color: 'blue', navDisplayName: 'NPCs', topNav: true }  },
  { path: '/quests/:subpage?', name: 'quests', component: Quests,
    meta: { color: 'indigo', navDisplayName: 'Quests', topNav: true }  },
  { path: '/materials', name: 'materials', component: Materials,
    meta: { color: 'violet', navDisplayName: 'Materials', topNav: true }  },

  { path: '/about', name: 'about', component: About,
    meta: { navDisplayName: 'About', bottomNav: true } },
  { path: '/acknowledgements', name: 'acknowledgements', component: Acknowledgements,
    meta: { navDisplayName: 'Acknowledgements', bottomNav: true } },

  { path: '/:pathMatch(.*)*', component: NotFound }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})

export type RouteName =
  | 'objects'
  | 'locations'
  | 'magic'
  | 'shops'
  | 'npcs'
  | 'quests'
  | 'materials'
  | 'about'
  | 'acknowledgements'