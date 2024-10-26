'use client'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { useConnectWallet } from '@echo/ui/hooks/use-connect-wallet'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  account: AccountResult
  onConnected?: VoidFunction
}

export const WalletButtonConnecting: FunctionComponent<Props> = ({ account, onConnected }) => {
  const connected = useConnectWallet(account)
  // trigger callback when connected
  useEffect(() => {
    if (connected) {
      onConnected?.()
    }
  }, [onConnected, connected])

  return <ConnectWalletButtonLayout isConnecting={true} />
}
