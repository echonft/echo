import { apiBasePath } from '@echo/api/routing/api/api-base-path'

export function isApiPath(path: string): boolean {
  return path.startsWith(`${apiBasePath}/`)
}
