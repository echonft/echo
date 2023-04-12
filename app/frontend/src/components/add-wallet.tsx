import { Signature, Wallet } from '@echo/model'
import { useAddWallet } from '@lib/hooks/use-add-wallet'
import { R } from '@mobily/ts-belt'
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
  const { data } = useAddWallet(message, signature, wallet)

  useEffect(() => {
    if (!isNil(data) && R.isError(data)) {
      // TODO We should get the error here
      onError?.('Error adding wallet')
    }
  }, [data, onError])

  useEffect(() => {
    if (!isNil(data) && R.isOk(data)) {
      onSuccess?.(R.getExn(data).wallets)
    }
  }, [data, onSuccess])

  return null
}
