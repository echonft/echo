import type { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'

export interface NextFetchError {
  status: ErrorStatus
  message: string
}
