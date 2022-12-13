import { ApiRoutes, getApiRouteUrl, NonceRequest, NonceResponse } from '@echo/api'
import { fetcher } from '@lib/services/fetcher'
import { isEmpty, isNil } from 'ramda'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export const useFetchNonce = (address: string | undefined) => {
  const { data, error } = useSWRImmutable<NonceResponse, Error, [string, NonceRequest] | undefined>(
    !isNil(address) && !isEmpty(address) ? [getApiRouteUrl(ApiRoutes.NONCE), { address }] : undefined,
    fetcher
  )
  return { nonce: data?.nonce, error }
}
