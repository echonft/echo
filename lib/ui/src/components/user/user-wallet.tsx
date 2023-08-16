import { shortenAddress } from '@echo/utils'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  address: string
}

// TODO Add copy on click
export const UserWallet: FunctionComponent<Props> = ({ address }) => {
  return (
    <div className={clsx('flex', 'py-px', 'px-2', 'bg-white/[0.08]', 'rounded-lg', 'w-max', 'items-center')}>
      <span className={clsx('prose-display-sm-bold', 'text-white')}>{shortenAddress(address)}</span>
    </div>
  )
}
