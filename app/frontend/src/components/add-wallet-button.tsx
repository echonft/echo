import { User } from '@echo/model'
import { useFetchNonce } from '@lib/hooks/use-fetch-nonce'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'
import { useAccount, useNetwork } from 'wagmi'

interface Props {
  user: User
}

export const AddWalletButton: FunctionComponent<Props> = ({ user }) => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const nonce = useFetchNonce(isNil(address) ? undefined : user.id)
  if (!isConnected) {
    return <ConnectKitButton />
  }
  return <button>Add wallet</button>
}
