import { NonceResponse, userNonceApiUrl } from '@echo/api-public'
import { getData } from '@echo/utils'
import useSWR from 'swr'

export const useFetchNonce = () => useSWR<NonceResponse, Error, URL>(userNonceApiUrl(), getData)
