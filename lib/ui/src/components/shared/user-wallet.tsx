import type { Wallet } from '@echo/model/types/wallet'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  wallet: Wallet
}

export const UserWallet: FunctionComponent<Props> = ({ wallet }) => {
  return (
    <span className={clsx('prose-paragraph-sm', '!text-[0.625rem]', 'text-white/80', 'tracking-[0.00625rem]')}>
      {shortenAddress(wallet)}
    </span>
  )
}
