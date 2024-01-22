import type { ErrorStatus } from '@echo/frontend/lib/constants/error-status'

export interface NextFetchError {
  status: ErrorStatus
  message: string
}
