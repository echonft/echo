import { useFetchNonce } from '@lib/hooks/use-fetch-nonce'
import { FunctionComponent } from 'react'

interface Props {
  userId: string
  address: string
}

export const AddWalletButton: FunctionComponent<Props> = ({ userId, address }) => {
  const nonce = useFetchNonce(userId)

  return <button>Add wallet</button>
}
