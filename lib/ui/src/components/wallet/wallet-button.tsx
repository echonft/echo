'use client'
import { WalletButtonLayout } from '@echo/ui/components/wallet/layout/wallet-button-layout'
import { WalletButtonChainManager } from '@echo/ui/components/wallet/wallet-button-chain-manager'
import { WalletButtonWalletStatusManager } from '@echo/ui/components/wallet/wallet-button-wallet-status-manager'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { useAccount } from '@echo/ui/hooks/use-account'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { ConnectKitButton } from 'connectkit'
import { type FunctionComponent, type MouseEventHandler, useState } from 'react'

interface WalletButtonInnerProps {
  walletLinked: boolean
  onClick?: MouseEventHandler
}

const WalletButtonInner: FunctionComponent<WalletButtonInnerProps> = ({ walletLinked, onClick }) => {
  const { address, status } = useAccount()
  if (status === AccountStatus.Connecting || status === AccountStatus.UnsupportedChain) {
    return <WalletButtonLayout isConnecting={true} />
  }
  if (status === AccountStatus.Connected) {
    if (walletLinked) {
      return <WalletConnectedTag address={address} />
    }
    return <WalletButtonLayout isConnecting={true} />
  }
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => (
        <WalletButtonLayout
          isConnecting={isConnecting}
          onClick={(event) => {
            show?.()
            onClick?.(event)
          }}
        />
      )}
    </ConnectKitButton.Custom>
  )
}

interface WalletButtonProps {
  onClick?: MouseEventHandler
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({ onClick }) => {
  const [walletLinked, setWalletLinked] = useState(false)

  return (
    <>
      <WalletButtonInner walletLinked={walletLinked} onClick={onClick} />
      <WalletButtonChainManager />
      <WalletButtonWalletStatusManager
        onWalletLinked={() => {
          setWalletLinked(true)
        }}
      />
    </>
  )
}
