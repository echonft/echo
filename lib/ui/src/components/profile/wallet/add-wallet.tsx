import { addWalletFetcher } from '@echo/api/helpers/add-wallet-fetcher'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect } from 'react'
import { SiweMessage } from 'siwe'
import useSWRMutation from 'swr/mutation'
import { useSignMessage } from 'wagmi'

interface Props {
  nonce: string
  address: string
  token: string | undefined
}

export const AddWallet: FunctionComponent<Props> = ({ nonce, address, token }) => {
  // FIXME Typing is not right because SiweMessage constructor can throw
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const siweMessage: SiweMessage = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign this message to add your wallet to Echo',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const { data, isError, isLoading, signMessage } = useSignMessage({ message: siweMessage.prepareMessage() })
  const addWallet = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    () => addWalletFetcher(address, siweMessage, data!, token),
    [address, data, siweMessage, token]
  )
  const { trigger, data: walletResponse } = useSWRMutation('add-wallet', addWallet)

  useEffect(() => {
    if (!isNil(data)) {
      void trigger()
    }
  }, [data])

  if (isError) {
    // TODO Catch the error?
    return null
  }
  if (!isNil(walletResponse)) {
    return <button disabled>Wallet Added!</button>
  }

  // TODO Design
  return (
    <button disabled={isLoading} onClick={() => signMessage()}>
      Add Wallet
    </button>
  )
}
