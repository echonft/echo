import { AddWallet } from '@echo/ui/components/profile/wallet/add-wallet'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'
import { SiweMessage } from 'siwe'
import { useSignMessage } from 'wagmi'

interface Props {
  nonce: string
  address: string
  token: string | undefined
}

export const CreateSignature: FunctionComponent<Props> = ({ nonce, address, token }) => {
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

  if (isError) {
    // TODO Catch the error?
    return null
  }

  if (!isNil(data)) {
    return <AddWallet address={address} message={siweMessage} signature={data} token={token} />
  }

  // TODO Design
  return (
    <button disabled={isLoading} onClick={() => signMessage()}>
      Add Wallet
    </button>
  )
}
