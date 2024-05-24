'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  address: HexString
  chain: ChainName
  truncatedAddress?: string
}

export const WalletConnectedTag: FunctionComponent<Props> = (props) => {
  const { truncatedAddress } = props
  return (
    <div className={clsx('btn-auth', '!enabled:hover:bg-white/[0.08]')}>
      <WalletIconSvg width={24} />
      <span className={clsx('btn-label-auth')}>{truncatedAddress ?? shortenAddress(props)}</span>
    </div>
  )
}
