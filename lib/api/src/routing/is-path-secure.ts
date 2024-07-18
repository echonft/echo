import { securePaths } from '@echo/api/routing/secure-paths'

export function isPathSecure(path: string) {
  for (const securePath of securePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
