import { ApiRoutes, NonceRequest, NonceResponse } from '@echo/api/dist/types'
import { fetcher } from '@lib/services/fetcher'
import { isEmpty, isNil } from 'ramda'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export const useFetchNonce = (address: string | undefined) => {
  const { data, error } = useSWRImmutable<NonceResponse, Error, [ApiRoutes, NonceRequest] | undefined>(
    !isNil(address) && !isEmpty(address) ? [ApiRoutes.NONCE, { address }] : undefined,
    fetcher
  )
  return { nonce: data?.nonce, error }
}
