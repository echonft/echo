import { Wallet } from '@echo/model'
import { FunctionComponent } from 'react'

interface Props {
  wallets: Wallet[]
}

export const WalletList: FunctionComponent<Props> = ({ wallets }) => {
  return (
    <>
      <p>Current wallets are</p>
      {wallets.map((wallet) => (
        <p key={`${wallet.address}-${wallet.chainId}`}>{`${wallet.address}-${wallet.chainId}`}</p>
      ))}
    </>
  )
}
