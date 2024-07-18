import { apiSecurePaths } from '@echo/api/routing/api/api-secure-paths'

export function isApiPathSecure(path: string) {
  for (const securePath of apiSecurePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
