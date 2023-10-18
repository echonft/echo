import { getNonceFetcher } from '@echo/api/services/fetcher/get-nonce-fetcher'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect } from 'react'
import useSWR from 'swr'

interface Props {
  token: string
  onNonceReceived?: (nonce: string) => unknown
  onNonceError?: (error: Error) => unknown
}

export const NonceFetcher: FunctionComponent<Props> = ({ token, onNonceReceived, onNonceError }) => {
  const getNonce = useCallback(() => getNonceFetcher(token), [token])
  const { data, error } = useSWR<NonceResponse, Error, string>('nonce', getNonce)

  useEffect(() => {
    if (!isNil(data)) {
      onNonceReceived?.(data.nonce)
    }
  }, [data, onNonceReceived])

  useEffect(() => {
    if (!isNil(error)) {
      onNonceError?.(error)
    }
  }, [error, onNonceError])

  return null
}
