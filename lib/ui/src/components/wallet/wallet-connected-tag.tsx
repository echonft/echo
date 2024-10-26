'use client'
import type { Address } from '@echo/model/types/address'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { shortenAddress } from '@echo/web3/utils/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  address: Address
}

export const WalletConnectedTag: FunctionComponent<Props> = ({ address }) => {
  return (
    <div className={clsx('btn-auth', '!enabled:hover:bg-white/[0.08]')}>
      <WalletIconSvg width={24} />
      <span className={clsx('btn-label-auth')}>{shortenAddress(address)}</span>
    </div>
  )
}
