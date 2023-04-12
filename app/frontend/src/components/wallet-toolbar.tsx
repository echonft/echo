import { AddWalletButton } from '@components/add-wallet-button'
import { WalletList } from '@components/wallet-list'
import { Wallet } from '@echo/model'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import React, { useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

interface Props {
  userId: string
  currentWallets: Wallet[]
}

export const WalletToolbar: React.FunctionComponent<Props> = ({ userId, currentWallets }) => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const [wallets, setWallets] = useState<Wallet[]>(currentWallets)
  const [signatureRejected, setSignatureRejected] = useState(false)

  if (!isConnected || isNil(address) || isNil(chain)) {
    return <ConnectKitButton />
  } else {
    return (
      <div className={'flex flex-col gap-2'}>
        <div className={'flex flex-row gap-1'}>
          <AddWalletButton
            userId={userId}
            address={address}
            chainId={chain.id}
            onSuccess={(wallets) => {
              setWallets(wallets)
            }}
            onSignRejected={() => setSignatureRejected(true)}
            retry={signatureRejected}
          />
        </div>
        <WalletList wallets={wallets} />
      </div>
    )
  }
}
