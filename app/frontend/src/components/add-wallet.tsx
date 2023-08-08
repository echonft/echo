import { Signature, Wallet } from '@echo/model'
import { useAddWallet } from '@lib/hooks/use-add-wallet'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect } from 'react'
import { SiweMessage } from 'siwe'

interface Props {
  wallet: Wallet
  message: SiweMessage
  signature: Signature
  onSuccess?: (wallets: Wallet[]) => void
  onError?: (error: string) => void
}

export const AddWallet: FunctionComponent<Props> = ({ wallet, message, signature, onSuccess, onError }) => {
  const { data, error } = useAddWallet(message, signature, wallet)

  useEffect(() => {
    if (error) {
      // TODO We should get the error here
      onError?.('Error adding wallet')
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      onSuccess?.(data.wallets)
    }
  }, [data, onSuccess])

  return null
}
