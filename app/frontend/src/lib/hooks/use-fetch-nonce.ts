import { fetcher } from '../helpers/fetcher'
import { NonceResponse, userNonceApiUrl } from '@echo/api-public'
import useSWR from 'swr'

export const useFetchNonce = () =>
  useSWR<NonceResponse, Error, URL>(userNonceApiUrl(), (url) => fetcher(url).fetchResponse<NonceResponse>())
