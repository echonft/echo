'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  wallet: Wallet
}

export const UserWallet: FunctionComponent<Props> = ({ wallet }) => {
  return (
    <div className={clsx('prose-label-xs-semi', 'px-5', 'py-2.5', 'bg-white/[0.08]', 'rounded-lg', 'w-max', 'h-max')}>
      <CopyToClipboard text={formatAddress(wallet)}>
        <span className={clsx('text-white', 'cursor-pointer')}>{shortenAddress(wallet)}</span>
      </CopyToClipboard>
    </div>
  )
}
