import { apiBasePath } from '@echo/routing/api-base-path'

export function isApiPath(path: string): boolean {
  return path.startsWith(`${apiBasePath}/`)
}
