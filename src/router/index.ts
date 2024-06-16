import { createRouter, createWebHistory } from 'vue-router'
import Organisations from '../views/organisation/OrganisationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Organisations',
      component: Organisations
    }
  ]
})

export default router
