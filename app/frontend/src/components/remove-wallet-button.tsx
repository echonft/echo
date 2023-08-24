import { useRemoveWallet } from '@lib/hooks/use-remove-wallet'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  address: string
  chainId: number
  onSuccess?: () => unknown
  onError?: (error: string) => unknown
}

export const RemoveWalletButton: FunctionComponent<Props> = ({ address, chainId, onError, onSuccess }) => {
  const [toDelete, setToDelete] = useState(false)
  const { data, error } = useRemoveWallet(toDelete ? { address, chainId } : undefined)
  useEffect(() => {
    if (!isNil(error)) {
      // TODO We should get the error here
      onError?.('Error adding wallet')
      setToDelete(false)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      onSuccess?.()
      setToDelete(false)
    }
  }, [data, onSuccess])

  return (
    <button
      disabled={toDelete}
      onClick={() => {
        setToDelete(true)
      }}
    >
      <span>Remove wallet</span>
    </button>
  )
}
