import type { NextFetchError } from '@echo/frontend/lib/types/services/fetch/next-fetch-error'

export interface NextFetchResponse<T> {
  data: T | undefined
  error: NextFetchError | undefined
}
