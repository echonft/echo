import { addWalletFetcher } from '@echo/api/services/fetcher/add-wallet-fetcher'
import { type HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect } from 'react'
import useSWR from 'swr'

interface Props {
  address: string
  chainId: number
  message: string
  signature: HexString
  token: string | undefined
  onWalletAdded?: () => unknown
  onWalletError?: (error: Error) => unknown
}

export const AddWalletFetcher: FunctionComponent<Props> = ({
  address,
  chainId,
  message,
  signature,
  token,
  onWalletAdded,
  onWalletError
}) => {
  const addWallet = useCallback(
    () => addWalletFetcher({ wallet: { address, chainId }, message, signature }, token),
    [address, chainId, message, signature, token]
  )
  const { data } = useSWR('add-wallet', addWallet, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  useEffect(() => {
    if (!isNil(data?.data)) {
      onWalletAdded?.()
    }
    if (!isNil(data?.error)) {
      onWalletError?.(data!.error)
    }
  }, [data, onWalletAdded, onWalletError])
  return null
}
