'use client'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { WalletButtonConnecting } from '@echo/ui/components/wallet/wallet-button-connecting'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { useAccount } from '@echo/ui/hooks/use-account'
import { ConnectKitButton } from 'connectkit'
import { isNil, pipe, T } from 'ramda'
import { type FunctionComponent, type MouseEventHandler, useState } from 'react'

export const ConnectWalletButton: FunctionComponent<{ onClick?: MouseEventHandler }> = ({ onClick }) => {
  const account = useAccount()
  const [connected, setConnected] = useState(false)

  if (connected && !isNil(account.wallet)) {
    return <WalletConnectedTag wallet={account.wallet} />
  }
  if (account.status === 'connected') {
    return <WalletButtonConnecting account={account} onConnected={pipe(T, setConnected)} />
  }
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => (
        <ConnectWalletButtonLayout
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
