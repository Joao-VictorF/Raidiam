import { defineStore } from 'pinia'
import { Breadcrumb, BreadcrumbsKeys } from '@/models/Breadcrumb'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    breadcrumbs: {} as Record<BreadcrumbsKeys, Breadcrumb>
  }),
  actions: {
    addBreadcrumb(breadcrumb: Breadcrumb) {
      this.breadcrumbs[breadcrumb.key] = breadcrumb
    },
    updateBreadcrumb(key: BreadcrumbsKeys, data: Partial<Breadcrumb>) {
      const breadcrumb = this.breadcrumbs[key]
      this.breadcrumbs[key] = {
        ...breadcrumb,
        ...data
      }
    },
    removeBreadcrumb(key: BreadcrumbsKeys) {
      delete this.breadcrumbs[key]
    },
    clearBreadcrumbs() {
      this.breadcrumbs = {} as Record<BreadcrumbsKeys, Breadcrumb>
    },
    breadcrumbsArray(): Array<Breadcrumb> {
      return Object.values(this.breadcrumbs)
    }
  }
})
