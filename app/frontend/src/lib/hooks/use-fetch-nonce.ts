import { NonceResponse, userNonceApiUrl } from '@echo/api-public'
import { fetcher } from '@lib/helpers/fetcher'
import useSWR from 'swr'

export const useFetchNonce = () =>
  useSWR<NonceResponse, Error, URL>(userNonceApiUrl(), (url) => fetcher(url).fetchResponse<NonceResponse>())
