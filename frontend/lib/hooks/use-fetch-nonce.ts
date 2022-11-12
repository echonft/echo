import { ApiRoutes } from '@lib/constants/api-routes'
import { NonceResponse } from '@lib/models/api/nonce-response'
import { fetcher } from '@lib/services/fetcher'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export const useFetchNonce = (address: string | undefined) => {
  const { data, error } = useSWRImmutable<NonceResponse>(address && [ApiRoutes.NONCE, { address }], fetcher)
  return { nonce: data?.nonce, error }
}
