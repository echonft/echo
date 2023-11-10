import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import type { NextFetchResponse } from '@echo/frontend/lib/types/services/fetch/next-fetch-response'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

export function assertNextFetchResponse<T>(
  response: NextFetchResponse<T>
): asserts response is Record<'data', NonNullable<T>> & Record<'error', undefined> {
  const { data, error } = response
  if (!isNil(error)) {
    if (error.status === ErrorStatus.NOT_FOUND) {
      notFound()
    }
    throw error
  }
  if (isNil(data)) {
    throw Error('empty response')
  }
}
