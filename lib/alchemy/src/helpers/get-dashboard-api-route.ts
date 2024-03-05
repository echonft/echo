import type { DashboardApiRoutes } from '@echo/alchemy/constants/dashboard-api-routes'

export function getDashboardApiRoute(route: DashboardApiRoutes) {
  return `https://dashboard.alchemy.com/api/${route}`
}
