import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import type { FetchResult } from '@echo/frontend/lib/services/fetcher/fetcher'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

export function assertFetchResult<T>(
  result: FetchResult<T>
): asserts result is Record<'data', NonNullable<T>> & Record<'error', undefined> {
  const { data, error } = result
  if (!isNil(error)) {
    if (error instanceof ApiError) {
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw error
    }
    throw error
  }
  if (isNil(data)) {
    throw Error('empty response')
  }
}
