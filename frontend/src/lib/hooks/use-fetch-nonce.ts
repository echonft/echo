import { ApiRoutes, NonceResponse } from '@echo/api'
import { fetcher } from '@lib/services/fetcher'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export const useFetchNonce = (address: string | undefined) => {
  const { data, error } = useSWRImmutable<NonceResponse, Error>(address && [ApiRoutes.NONCE, { address }], fetcher)
  return { nonce: data?.nonce, error }
}
