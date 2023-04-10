import { AddWalletButton } from '@components/add-wallet-button'
import { ConnectKitButton } from 'connectkit'
import React from 'react'
import { useAccount, useNetwork } from 'wagmi'

interface Props {
  userId: string
}

export const WalletToolbar: React.FunctionComponent<Props> = ({ userId }) => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected) {
    return <ConnectKitButton />
  } else {
    return <AddWalletButton userId={userId} address={address!} />
  }
}
