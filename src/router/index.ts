import { createRouter, createWebHistory } from 'vue-router'
import Organisations from '../views/organisations/OrganisationsView.vue'
import OrganisationById from '@/views/organisation-by-id/OrganisationByIdView.vue'

import { useNavigationStore } from '@/stores/navigation'
import { BreadcrumbsKeys, BreadcrumbsTitles, Breadcrumb } from '@/models/Breadcrumb'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Organisations',
      component: Organisations,
      meta: {
        key: BreadcrumbsKeys.ORGANISATIONS,
        title: BreadcrumbsTitles.ORGANISATIONS
      }
    },
    {
      path: '/organisation/:id',
      name: 'OrganisationById',
      component: OrganisationById,
      meta: {
        key: BreadcrumbsKeys.ORGANISATION_BY_ID,
        title: '',
        pageHeaderClasses: 'sticky top-0'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const navigationStore = useNavigationStore()

  if (to.path === '/' && from.path.startsWith('/organisation/')) {
    navigationStore.clearBreadcrumbs()
  }

  if (to.meta.key) {
    const breadcrumb: Breadcrumb = {
      key: to.meta.key as BreadcrumbsKeys,
      title: to.meta.title as BreadcrumbsTitles,
      route: to.fullPath
    }
    navigationStore.addBreadcrumb(breadcrumb)
  }

  next()
})

export default router
