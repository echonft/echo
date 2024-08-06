'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { shortenAddress } from '@echo/web3/utils/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  wallet: Wallet
}

export const WalletConnectedTag: FunctionComponent<Props> = ({ wallet }) => {
  return (
    <div className={clsx('btn-auth', '!enabled:hover:bg-white/[0.08]')}>
      <WalletIconSvg width={24} />
      <span className={clsx('btn-label-auth')}>{shortenAddress(wallet)}</span>
    </div>
  )
}
