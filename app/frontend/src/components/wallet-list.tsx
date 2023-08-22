import { RemoveWalletButton } from '@components/remove-wallet-button'
import { Wallet } from '@echo/ui'
import { FunctionComponent } from 'react'

interface Props {
  wallets: Wallet[]
  onSuccess?: () => unknown
  onError?: (error: string) => unknown
}

export const WalletList: FunctionComponent<Props> = ({ wallets, onError, onSuccess }) => {
  return (
    <>
      <p>Current wallets are</p>
      {wallets.map((wallet) => (
        <div className={'flex flex-row gap-5'} key={`${wallet.address}-${wallet.chainId}`}>
          <p>{`${wallet.address}-${wallet.chainId}`}</p>
          <RemoveWalletButton
            chainId={wallet.chainId}
            address={wallet.address}
            onError={onError}
            onSuccess={onSuccess}
          />
        </div>
      ))}
    </>
  )
}
