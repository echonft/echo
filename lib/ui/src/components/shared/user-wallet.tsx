'use client'
import { shortenAddress } from '@echo/utils/helpers/shorten-address'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  address: HexString
}

export const UserWallet: FunctionComponent<Props> = ({ address }) => {
  return (
    <div className={clsx('prose-label-xs-semi', 'px-5', 'py-2.5', 'bg-white/[0.08]', 'rounded-lg', 'w-max', 'h-max')}>
      <CopyToClipboard text={address}>
        <span className={clsx('text-white', 'cursor-pointer')}>{shortenAddress(address)}</span>
      </CopyToClipboard>
    </div>
  )
}
