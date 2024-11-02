import { WalletButtonLayout } from '@echo/ui/components/wallet/layout/wallet-button-layout'
import { type FunctionComponent } from 'react'

export const WalletButtonSkeleton: FunctionComponent = () => {
  return <WalletButtonLayout isConnecting={true} />
}
