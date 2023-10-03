import { getNonceFetcher } from '@echo/api/helpers/get-nonce-fetcher'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback, useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

interface Props {
  token: string | undefined
  onNonceReceived?: (nonce: string) => unknown
  onNonceError?: (error: Error) => unknown
}

export const NonceFetcher: FunctionComponent<Props> = ({ token, onNonceReceived, onNonceError }) => {
  const getNonce = useCallback(() => getNonceFetcher(token), [token])
  const { data: response } = useSWRImmutable('nonce', getNonce)

  useEffect(() => {
    if (!isNil(response?.data)) {
      onNonceReceived?.(response!.data.nonce)
    }
    if (!isNil(response?.error)) {
      onNonceError?.(response!.error)
    }
  }, [response, onNonceError, onNonceReceived])

  return null
}
