'use client'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { useAccount } from '@echo/ui/hooks/use-account'
import { type FunctionComponent } from 'react'

export const ProfileNftsEmptyButton: FunctionComponent = () => {
  const account = useAccount()
  if (account.status !== 'connected') {
    return <ConnectWalletButton />
  }
  return null
}
