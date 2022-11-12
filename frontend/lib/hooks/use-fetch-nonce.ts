import { Routes } from '@lib/services/api/constants/routes'
import { NonceResponse } from '@lib/services/api/models/nonce-response'
import { fetcher } from '@lib/services/fetcher/fetcher'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export const useFetchNonce = (address: string | undefined) => {
  const { data, error } = useSWRImmutable<NonceResponse>(address && [Routes.NONCE, { address }], fetcher)
  return { nonce: data?.nonce, error }
}
