'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import type { HexString } from '@echo/utils/types/hex-string'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { type FunctionComponent } from 'react'

interface Props {
  address: HexString
  chainId: number
  truncatedAddress?: string
}

export const WalletConnectedTag: FunctionComponent<Props> = (props) => {
  const { truncatedAddress } = props
  return (
    <div
      className={classes(
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
      <span
        className={classes('h-max', 'w-max', 'text-white', 'prose-label-xs', '!tracking-[0.015rem]', 'select-none')}
      >
        <WalletIconSvg />
      </span>
      <span
        className={classes('h-max', 'w-max', 'text-white', 'prose-label-xs', '!tracking-[0.015rem]', 'select-none')}
      >
        {truncatedAddress ?? shortenAddress(props)}
      </span>
    </div>
  )
}
