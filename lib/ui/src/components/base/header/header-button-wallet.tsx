import { WalletButton } from '@echo/ui/components/base/wallet/wallet-button'
import { useAccount } from '@echo/ui/hooks/use-account'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const HeaderButtonWallet: FunctionComponent = () => {
  const { address, status } = useAccount()
  if (status === AccountStatus.Connected) {
    return <span className={clsx('btn-label-primary')}>{shortenAddress(address)}</span>
  }
  return <WalletButton />
}
