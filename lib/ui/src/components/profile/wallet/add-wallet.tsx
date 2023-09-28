import { addWalletFetcher } from '@echo/api/helpers/add-wallet-fetcher'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback } from 'react'
import { SiweMessage } from 'siwe'
import useSWR from 'swr'

interface Props {
  address: string
  message: SiweMessage
  signature: `0x${string}`
  token: string | undefined
}

export const AddWallet: FunctionComponent<Props> = ({ address, message, signature, token }) => {
  const addWallet = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    () => addWalletFetcher(address, message, signature, token),
    [address, signature, message, token]
  )
  const { data } = useSWR('add-wallet', addWallet)

  if (!isNil(data)) {
    return <button disabled>Wallet Added!</button>
  }
  return <button disabled>Adding wallet..</button>
}
