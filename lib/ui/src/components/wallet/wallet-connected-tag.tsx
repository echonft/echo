'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import type { HexString } from '@echo/utils/types/hex-string'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  address: HexString
  chainId: number
}

export const WalletConnectedTag: FunctionComponent<Props> = (props) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'rounded-lg',
        'bg-white/[0.08]',
        'gap-2.5',
        'h-[1.875rem]',
        'w-max',
        'px-2.5'
      )}
    >
      <span className={clsx('h-max', 'w-max', 'text-white', 'prose-label-xs', '!tracking-[0.015rem]', 'select-none')}>
        <WalletIconSvg />
      </span>
      <span className={clsx('h-max', 'w-max', 'text-white', 'prose-label-xs', '!tracking-[0.015rem]', 'select-none')}>
        {shortenAddress(props)}
      </span>
    </div>
  )
}
