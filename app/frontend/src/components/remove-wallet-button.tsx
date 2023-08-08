import { Wallet } from '@echo/model'
import { useRemoveWallets } from '@lib/hooks/use-remove-wallets'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  address: string
  chainId: number
  onSuccess?: (wallets: Wallet[]) => void
  onError?: (error: string) => void
}

export const RemoveWalletButton: FunctionComponent<Props> = ({ address, chainId, onError, onSuccess }) => {
  const [toDelete, setToDelete] = useState(false)
  const { data, error } = useRemoveWallets(toDelete ? [{ address, chainId }] : undefined)
  useEffect(() => {
    if (!isNil(error)) {
      // TODO We should get the error here
      onError?.('Error adding wallet')
      setToDelete(false)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      onSuccess?.(data.wallets)
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
