'use client'
import { WalletButtonLayout } from '@echo/ui/components/wallet/layout/wallet-button-layout'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { useAccount } from '@echo/ui/hooks/use-account'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { ConnectKitButton } from 'connectkit'
import { type FunctionComponent } from 'react'

export const WalletButton: FunctionComponent = () => {
  const { address, status } = useAccount()
  if (status === AccountStatus.Connecting || status === AccountStatus.UnsupportedChain) {
    return <WalletButtonLayout isConnecting={true} />
  }
  if (status === AccountStatus.Connected) {
    return <WalletConnectedTag address={address} />
  }
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => (
        <WalletButtonLayout
          isConnecting={isConnecting}
          onClick={(_event) => {
            show?.()
            // onClick?.(event)
          }}
        />
      )}
    </ConnectKitButton.Custom>
  )
}
