import { Wallet } from '@echo/model'
import { useAddWallet } from '@lib/hooks/use-add-wallet'
import { useFetchNonce } from '@lib/hooks/use-fetch-nonce'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  userId: string
  address: string
}

export const AddWalletButton: FunctionComponent<Props> = ({ userId, address }) => {
  const nonce = useFetchNonce(userId)
  const [walletToAdd, setWalletToAdd] = useState<Wallet>()
  const { data: walletsResults } = useAddWallet(walletToAdd)
  if (!isNil(walletsResults) && !R.isError(walletsResults)) {
    console.log(`wallets are ${JSON.stringify(R.getExn(walletsResults))}`)
  }
  return <button onClick={() => setWalletToAdd({ address, chainId: 1 })}>Add wallet</button>
}
