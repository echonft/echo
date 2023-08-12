import { AddWallet } from '@components/add-wallet'
import { SignMessage } from '@components/sign-message'
import { Signature, Wallet } from '@echo/ui-model'
import { useFetchNonce } from '@lib/hooks/use-fetch-nonce'
import { isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'
import { SiweMessage } from 'siwe'

enum AddState {
  IDLE,
  SIGNING,
  ADDING
}

interface Props {
  address: string
  chainId: number
  userId: string
  retry?: boolean
  onSignRejected?: () => void
  onSuccess?: (wallets: Wallet[]) => void
  onError?: (error: string) => void
}

export const AddWalletButton: FunctionComponent<Props> = ({
  address,
  chainId,
  userId,
  retry,
  onSignRejected,
  onSuccess,
  onError
}) => {
  const { data: nonceData, error, mutate } = useFetchNonce(userId)
  const [addState, setAddState] = useState(AddState.IDLE)
  const [message, setMessage] = useState<SiweMessage>()
  const [signature, setSignature] = useState<Signature>()
  const nonce = !isNil(error) ? undefined : nonceData?.nonce

  if (addState === AddState.SIGNING && !isNil(nonce)) {
    return (
      <>
        <button disabled>
          <span>Adding wallet...</span>
        </button>
        <SignMessage
          statement={'Sign in to add this wallet to your account'}
          nonce={nonce}
          onSuccess={(message, signature) => {
            setMessage(message)
            setSignature(signature)
            setAddState(AddState.ADDING)
          }}
          onReject={() => {
            setAddState(AddState.IDLE)
            onSignRejected?.()
          }}
        />
      </>
    )
  }

  if (addState === AddState.ADDING) {
    if (isNil(message) || isNil(signature)) {
      return (
        <button disabled>
          <span>Adding wallet...</span>
        </button>
      )
    }
    return (
      <>
        <button disabled>
          <span>Adding wallet...</span>
        </button>
        <AddWallet
          wallet={{ address, chainId }}
          message={message}
          signature={signature}
          onSuccess={(wallets) => {
            // Refetch nonce if success
            void mutate()
            onSuccess?.(wallets)
          }}
          onError={(error) => {
            // Refetch nonce if error
            void mutate()
            onError?.(error)
          }}
        />
      </>
    )
  }

  return (
    <button
      disabled={isNil(nonce) || !isNil(error)}
      onClick={() => {
        setAddState(AddState.SIGNING)
      }}
    >
      <span>{retry ? 'retry' : 'Add wallet'}</span>
    </button>
  )
}
