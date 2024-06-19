import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/dashboard/DashboardView.vue'
import ApiResources from '@/views/api-resources/ApiResources.vue'
import Organisations from '@/views/organisations/OrganisationsView.vue'
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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        key: BreadcrumbsKeys.DASHBOARD,
        title: BreadcrumbsTitles.DASHBOARD,
        pageHeaderClasses: 'sticky top-0'
      }
    },
    {
      path: '/organisations/:id',
      name: 'OrganisationById',
      component: OrganisationById,
      meta: {
        key: BreadcrumbsKeys.ORGANISATION_BY_ID,
        title: '',
        pageHeaderClasses: 'sticky top-0'
      }
    },
    {
      path: '/organisations/:id/s/:serverId/api-resources',
      name: 'Api Resources',
      component: ApiResources,
      meta: {
        key: BreadcrumbsKeys.API_RESOURCES,
        title: BreadcrumbsTitles.API_RESOURCES,
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
