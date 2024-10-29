'use client'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useWallet } from '@echo/ui/hooks/use-wallet'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  onConnected?: VoidFunction
}

export const WalletButtonConnecting: FunctionComponent<Props> = ({ onConnected }) => {
  const account = useAccount()
  const connected = useWallet(account)
  // trigger callback when connected
  useEffect(() => {
    if (connected) {
      onConnected?.()
    }
  }, [onConnected, connected])

  return <ConnectWalletButtonLayout isConnecting={true} />
}
