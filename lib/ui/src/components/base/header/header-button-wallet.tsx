import { SeiIconSvg } from '@echo/ui/components/base/svg/sei-icon-svg'
import { WalletButtonLayout } from '@echo/ui/components/base/wallet/layout/wallet-button-layout'
import { useAccount } from '@echo/ui/hooks/use-account'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const HeaderButtonWallet: FunctionComponent = () => {
  const { address, status } = useAccount()
  if (status === AccountStatus.Connected) {
    return (
      <div className={clsx('btn-auth', 'group-hover:bg-white/[0.12]')}>
        <SeiIconSvg width={24} />
        <span className={clsx('btn-label-auth')}>{shortenAddress(address)}</span>
      </div>
    )
  }
  return <WalletButtonLayout />
}
